<!-- resources/views/auth/register.blade.php -->

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>
<body>
    <h2>Formulario de Registro</h2>
    
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Campo Nombre -->
        <label for="name">Nombre</label>
        <input type="text" name="name" id="name" value="{{ old('name') }}" required>
        @error('name') <div>{{ $message }}</div> @enderror

        <!-- Campo Email -->
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="{{ old('email') }}" required>
        @error('email') <div>{{ $message }}</div> @enderror

        <!-- Campo Contraseña -->
        <label for="password">Contraseña</label>
        <input type="password" name="password" id="password" required>
        @error('password') <div>{{ $message }}</div> @enderror

        <!-- Campo Confirmación de Contraseña -->
        <label for="password_confirmation">Confirmar Contraseña</label>
        <input type="password" name="password_confirmation" id="password_confirmation" required>

        <!-- Campo Rol -->
        <label for="rol_id">Rol</label>
        <select name="rol_id" id="rol_id" required>
            <option value="1">Administrador</option>
            <option value="2">Usuario</option>
        </select>
        @error('rol_id') <div>{{ $message }}</div> @enderror

        <button type="submit">Registrar</button>
    </form>
</body>
</html>

