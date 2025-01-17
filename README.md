# Configuración Inicial para Compilar el Proyecto en Android Studio

Este documento detalla los pasos necesarios para configurar correctamente Android Studio y compilar el proyecto.

## Requisitos Previos

1. **Android Studio**: Asegúrate de tener instalada la última versión de Android Studio.
2. **JDK**: Descarga y configura la versión adecuada del JDK.

## Pasos para la Configuración

### 1. Descargar y Configurar el JDK

1. Descarga la versión 17 del JDK que utiliza **JetBrains Runtime 17** desde el siguiente enlace: [JetBrains Runtime 17](https://www.jetbrains.com/help/idea/sdk.html).
2. Instálalo en tu sistema siguiendo las instrucciones del instalador.

### 2. Configurar el JDK en Android Studio

1. Abre Android Studio.
2. Navega a **File > Project Structure > SDK Location**.
3. En la sección de **JDK Location**, selecciona el directorio donde instalaste el JDK 17 con JetBrains Runtime 17.

   - En sistemas Windows, la ruta podría ser algo similar a:
     ```
     C:\Program Files\JetBrains\Runtime\jbr-17
     ```
   - En sistemas Linux/MacOS, la ruta podría ser algo similar a:
     ```
     /usr/lib/jvm/jetbrains-runtime-17
     ```

### 3. Configurar Gradle JDK

1. Dentro de Android Studio, navega a **File > Settings > Build, Execution, Deployment > Build Tools > Gradle**.
2. En la sección de **Gradle JDK**, selecciona **Java 17**.

### 4. Verificar la Configuración

1. Abre cualquier proyecto en Android Studio.
2. Ve a **File > Project Structure > SDK Location**.
3. Verifica que el campo **JDK Location** apunte al JDK 17 configurado previamente.
4. Asegúrate de que el proyecto compile correctamente pulsando **Build > Make Project**.

## Notas Adicionales

- Si encuentras algún error relacionado con el JDK, asegúrate de que la variable de entorno `JAVA_HOME` esté configurada para apuntar al JDK 17:

  - En Windows:
    ```
    set JAVA_HOME=C:\Program Files\JetBrains\Runtime\jbr-17
    ```
  - En Linux/MacOS:
    ```
    export JAVA_HOME=/usr/lib/jvm/jetbrains-runtime-17
    ```

- Reinicia Android Studio después de realizar los cambios para garantizar que se apliquen correctamente.

---

Con estos pasos deberías poder compilar el proyecto sin problemas. Si tienes alguna duda o encuentras errores adicionales, revisa la documentación oficial de Android Studio o JetBrains.

