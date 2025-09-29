<?php

namespace App\Models;

use App\Core\Database;

class ProgresoSena
{
    private Database $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    /**
     * Registrar una seña vista por el usuario
     */
    public function record(int $userId, int $senaId, int $categoriaId): bool
    {
        error_log("=== DEBUG MODEL: Entrando a record() - User:$userId, Sena:$senaId, Cat:$categoriaId ===");

        try {
            // Buscar si ya existe progreso para esta categoría
            $this->db->query("SELECT senas_vistas FROM progresos WHERE id_usuario = :user_id AND id_categoria = :categoria_id");
            $this->db->bind(':user_id', $userId);
            $this->db->bind(':categoria_id', $categoriaId);
            $row = $this->db->single();
            error_log("DEBUG MODEL: Row encontrada: " . ($row ? json_encode($row) : 'NULL'));

            if ($row) {
                // Actualizar si ya existe
                $senasVistasRaw = $row['senas_vistas'] ?? '[]';
                
                // Validar y decodificar JSON
                if (empty($senasVistasRaw) || $senasVistasRaw === 'null') {
                    $senasVistas = [];
                } else {
                    $senasVistas = json_decode($senasVistasRaw, true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        error_log("DEBUG MODEL: Error decodificando JSON, inicializando array vacío");
                        $senasVistas = [];
                    }
                }
                
                // Asegurar que sea array
                if (!is_array($senasVistas)) {
                    $senasVistas = [];
                }
                
                error_log("DEBUG MODEL: Senas vistas actuales: " . json_encode($senasVistas));

                // Verificar si ya fue vista (convertir todo a enteros)
                $senasVistasInt = array_map('intval', $senasVistas);
                if (in_array((int)$senaId, $senasVistasInt)) {
                    error_log("DEBUG MODEL: Seña ya vista, no se actualiza");
                    return true; // No es error, simplemente ya estaba registrada
                }

                // Agregar nueva seña
                $senasVistas[] = (int)$senaId;
                $senasVistas = array_values(array_unique(array_map('intval', $senasVistas)));
                $senasVistasJson = json_encode($senasVistas, JSON_NUMERIC_CHECK);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    error_log("DEBUG MODEL: Error codificando JSON para UPDATE");
                    return false;
                }

                $this->db->query("UPDATE progresos SET senas_vistas = :senas_vistas, updated_at = NOW() 
                                WHERE id_usuario = :user_id AND id_categoria = :categoria_id");
                $this->db->bind(':senas_vistas', $senasVistasJson);
                $this->db->bind(':user_id', $userId);
                $this->db->bind(':categoria_id', $categoriaId);
                $result = $this->db->execute();
                error_log("DEBUG MODEL: UPDATE ejecutado, resultado: " . ($result ? 'SUCCESS' : 'FAILED'));
                return $result;

            } else {
                // Insertar si no existe
                error_log("DEBUG MODEL: No existe registro, creando nuevo");
                $senasVistasJson = json_encode([(int)$senaId], JSON_NUMERIC_CHECK);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    error_log("DEBUG MODEL: Error JSON en INSERT");
                    return false;
                }

                $this->db->query("INSERT INTO progresos (id_usuario, id_categoria, senas_vistas, created_at, updated_at) 
                                VALUES (:user_id, :categoria_id, :senas_vistas, NOW(), NOW())");
                $this->db->bind(':user_id', $userId);
                $this->db->bind(':categoria_id', $categoriaId);
                $this->db->bind(':senas_vistas', $senasVistasJson);
                $result = $this->db->execute();
                error_log("DEBUG MODEL: INSERT ejecutado, resultado: " . ($result ? 'SUCCESS' : 'FAILED'));
                return $result;
            }

        } catch (\Exception $e) {
            error_log("DEBUG MODEL: Excepción en record(): " . $e->getMessage());
            return false;
        }
    }

    /**
     * Obtener las señas vistas por el usuario en una categoría
     */
    public function getSenasVistas(int $userId, int $categoriaId): array
    {
        try {
            $this->db->query("SELECT senas_vistas FROM progresos WHERE id_usuario = :user_id AND id_categoria = :categoria_id");
            $this->db->bind(':user_id', $userId);
            $this->db->bind(':categoria_id', $categoriaId);
            $result = $this->db->single();

            if ($result && !empty($result['senas_vistas']) && $result['senas_vistas'] !== 'null') {
                $decoded = json_decode($result['senas_vistas'], true);
                if (is_array($decoded)) {
                    return array_map('intval', $decoded);
                }
            }

            return [];

        } catch (\Exception $e) {
            error_log("Error en getSenasVistas: " . $e->getMessage());
            return [];
        }
    }
}