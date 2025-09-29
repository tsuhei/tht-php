<?php

namespace App\Models;

use App\Core\Database;

class ProgresoCategoria
{
    /**
     * Verifica si ya existe un progreso para un usuario en una categoría.
     */
    public static function exists(int $userId, int $catId): bool
    {
        $db = new Database();
        $db->query(" SELECT COUNT(*) AS total
            FROM progresos
            WHERE id_usuario = :u AND id_categoria = :c
        ");
        $db->bind(':u', $userId);
        $db->bind(':c', $catId);
        $row = $db->single();
        return !empty($row['total']);
    }

    /**
     * Crea un nuevo registro de progreso vacío para un usuario y categoría.
     */
    public static function add(int $userId, int $catId): void
    {
        $db = new Database();
        $db->query(" INSERT INTO progresos (id_usuario, id_categoria, senas_vistas, created_at, updated_at)
            VALUES (:u, :c, '[]', NOW(), NOW())
        ");
        $db->bind(':u', $userId);
        $db->bind(':c', $catId);
        $db->execute();
    }

    /**
     * Obtiene todos los progresos de un usuario con categorías.
     */
    public static function getByUser(int $userId): array
    {
        $db = new Database();
        $db->query(" SELECT 
                pc.created_at, 
                c.nom_categoria,
                pc.senas_vistas
            FROM progresos pc
            JOIN categorias c ON pc.id_categoria = c.id
            WHERE pc.id_usuario = :u
            ORDER BY pc.created_at ASC
        ");
        $db->bind(':u', $userId);
        return $db->resultSet();
    }

    /**
     * Obtiene el progreso de un usuario en una categoría específica.
     */
    public static function getProgresoByUserCategory(int $userId, int $catId): array
    {
        $db = new Database();
        $db->query(" SELECT
                c.id,
                c.nom_categoria,
                c.icono,
                (SELECT COUNT(*) FROM senas s WHERE s.id_categoria = c.id) AS total_senas,
                pc.senas_vistas
            FROM categorias c
            LEFT JOIN progresos pc 
                ON c.id = pc.id_categoria AND pc.id_usuario = :userId
            WHERE c.id = :catId
            LIMIT 1
        ");
        $db->bind(':userId', $userId);
        $db->bind(':catId', $catId);
        $row = $db->single();

        if (!$row) {
            return [
                'id' => $catId,
                'nom_categoria' => '',
                'icono' => '',
                'total_senas' => 0,
                'senas_completadas' => 0,
                'progreso' => 0,
            ];
        }

        $totalSenas = (int)($row['total_senas'] ?? 0);
        $senasCompletadas = 0;

        if (!empty($row['senas_vistas'])) {
            $decoded = json_decode($row['senas_vistas'], true);
            if (is_array($decoded)) {
                $senasCompletadas = count($decoded);
            }
        }

        $progreso = 0;
        if ($totalSenas > 0) {
            $progreso = ($senasCompletadas / $totalSenas) * 100;
            if ($progreso > 100) {
                $progreso = 100;
            }
        }

        return [
            'id' => $row['id'],
            'nom_categoria' => $row['nom_categoria'],
            'icono' => $row['icono'],
            'total_senas' => $totalSenas,
            'senas_completadas' => $senasCompletadas,
            'progreso' => round($progreso, 2),
        ];
    }

    /**
     * Obtiene todos los progresos (modo admin).
     */
    public static function getAll(): array
    {
        $db = new Database();
        $db->query(" SELECT 
                CONCAT(pc.id_usuario, '-', pc.id_categoria) as id,
                u.nom_usuario AS usuario, 
                c.nom_categoria AS categoria, 
                pc.senas_vistas,
                pc.created_at,
                pc.updated_at
            FROM progresos pc
            JOIN usuarios u ON pc.id_usuario = u.id
            JOIN categorias c ON pc.id_categoria = c.id
            ORDER BY pc.created_at ASC
        ");
        return $db->resultSet();
    }
}
