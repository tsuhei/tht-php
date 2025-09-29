<?php

namespace App\Controllers\User;

use App\Core\Controller;
use App\Models\Sena;
use App\Models\ProgresoSena;
use App\Models\ProgresoCategoria;
use App\Models\Categoria;

class SenasUserController extends Controller
{
    public function index(int $id_categoria): void
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (empty($_SESSION['usuario'])) {
            header('Location: ' . BASE_URL . 'auth/login');
            exit;
        }

        $categoriaModel = new Categoria();
        $senaModel = new Sena();

        $categoria = $categoriaModel->find($id_categoria);
        if (!$categoria) {
            header('Location: ' . BASE_URL . 'usuarios/categorias');
            exit;
        }

        $senas = $senaModel->getByCategoriaId($id_categoria);

        // Inicializar progreso vacío si no existe
        $userId = (int) $_SESSION['usuario']['id'];
        if (!ProgresoCategoria::exists($userId, $id_categoria)) {
            ProgresoCategoria::add($userId, $id_categoria);
        }

        $userName = $_SESSION['usuario']['nom_usuario'] ?? 'Usuario';
        $active   = 'cat';

        echo $this->view('usuarios/senas_user', [
            'userName'  => $userName,
            'active'    => $active,
            'categoria' => $categoria,
            'senas'     => $senas,
        ]);
    }

    public function registrarProgreso(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        // Si no es POST, redirigir
        header('Location: ' . BASE_URL . 'usuarios/categorias');
        exit;
    }

    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    $userId = $_SESSION['usuario']['id'] ?? null;
    if (!$userId) {
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
            // Si es AJAX, devolver error JSON
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'error' => 'No autenticado']);
            exit;
        } else {
            header('Location: ' . BASE_URL . 'auth/login');
            exit;
        }
    }

    $senaId = (int) ($_POST['id_sena'] ?? 0);
    $categoriaId = (int) ($_POST['id_categoria'] ?? 0);

    if ($senaId < 1 || $categoriaId < 1) {
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
            exit;
        } else {
            header('Location: ' . BASE_URL . 'usuarios/categorias');
            exit;
        }
    }

    $progresoSena = new ProgresoSena();
    $resultado = $progresoSena->record($userId, $senaId, $categoriaId);

    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        // Si es AJAX, devolver JSON
        header('Content-Type: application/json');
        echo json_encode(['success' => $resultado]);
        exit;
    } else {
        // Si no es AJAX, redirigir
        header('Location: ' . BASE_URL . 'usuarios/senas/' . $categoriaId);
        exit;
    }
}

}

