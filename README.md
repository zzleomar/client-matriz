# Matriz-Client

Este es un cliente Next.js que consume la API de procesamiento de matrices `apiMatriz`. El proyecto sigue los patrones de diseño del proyecto `atimed-frontend`.

## Características

- **Interfaz de usuario** con Ant Design
- **Formulario interactivo** para ingresar matrices 3x3 y parámetros
- **Visualización de matrices** con componentes optimizados
- **Manejo de matrices complejas** con elementos A y B
- **Responsive design** adaptable a diferentes pantallas

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

2. Configurar las variables de entorno:
```bash
cp .env.example .env.local
```

3. Ejecutar el proyecto en modo desarrollo:
```bash
npm run dev
```

## Uso

1. **Ingresar matrices**: Completa las matrices 3x3 en el formulario
   - Matriz 1: Números enteros
   - Matriz 2: Strings (letras)

2. **Configurar parámetros**: Establece los valores de `i` y `j` (0-2)

3. **Procesar**: Haz clic en "Procesar Matrices" para enviar la solicitud

4. **Ver resultados**: Los resultados se muestran en la columna derecha:
   - Matrices de entrada
   - Matriz Kij (resultado)
   - Matriz 3D completa (con colapso)

## Estructura del Proyecto

```
client/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Layout principal con Ant Design
│   │   └── page.tsx         # Página principal
│   ├── components/
│   │   └── matriz/
│   │       ├── MatrixForm.tsx           # Formulario de matrices
│   │       ├── MatrixDisplay.tsx        # Componente para matrices 3x3
│   │       └── ComplexMatrixDisplay.tsx # Componente para matrices complejas
│   └── services/
│       ├── instance.ts      # Configuración de Axios
│       └── matrixService.ts # Servicio para la API de matrices
└── package.json
```

## API

El cliente consume el endpoint:
```
POST http://0.0.0.0:8002/matriz
```

Con el payload:
```json
{
  "matriz1": [[1,2,3],[4,5,6],[7,8,9]],
  "matriz2": [["a","c","b"],["b","a","c"],["c","b","a"]],
  "i": 1,
  "j": 2
}
```

## Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Ant Design** - Librería de componentes UI
- **Styled Components** - Estilos personalizados
- **Axios** - Cliente HTTP

## Deploy en GitHub Pages

✅ **Configurado para GitHub Pages**: Build estático optimizado y workflow automático.

Ver guía completa: [GITHUB_PAGES.md](GITHUB_PAGES.md)

### Quick Deploy
1. Push a repositorio GitHub
2. Habilita GitHub Pages en Settings > Pages
3. Selecciona "GitHub Actions" como source
4. Deploy automático en cada push a `main`

### URLs
- **GitHub Pages**: `https://tu-usuario.github.io/client-matriz/`
- **API Railway**: `https://apimatriz-production.up.railway.app`

## Notas

- ✅ **Build estático exitoso** - Listo para GitHub Pages
- ✅ **API conectada** - Configurada para Railway
- El proyecto sigue los mismos patrones de diseño que `atimed-frontend`
- Las matrices se muestran de manera optimizada para pantallas pequeñas
