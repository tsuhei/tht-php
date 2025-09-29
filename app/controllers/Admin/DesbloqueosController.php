<?php
namespace App\Controllers\Admin;

use App\Core\Controller;
use App\Models\Desbloqueo;

class DesbloqueosController extends Controller
{
    public function index(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $adminName = $_SESSION['usuario']['nom_usuario'] ?? 'Invitado';

        // Crear instancia del modelo y llamar al método normalmente
        $desbloqueoModel = new Desbloqueo();
        $desbloqueos = $desbloqueoModel->getAll();

        require_once __DIR__ . '/../../views/admin/desbloqueos.php';
    }
}
