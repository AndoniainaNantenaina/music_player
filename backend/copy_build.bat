@echo off

echo Copying build files from frontend...
xcopy /s /y ..\frontend\build\index.html ..\backend\templates\
xcopy /s /y ..\frontend\build\static\css\*.* ..\backend\static\css\
xcopy /s /y ..\frontend\build\static\js\*.* ..\backend\static\js\
xcopy /s /y ..\frontend\build\static\media\*.* ..\backend\static\media\
xcopy /s /y ..\frontend\build\robots.txt ..\backend\static\
xcopy /s /y ..\frontend\build\manifest.json ..\backend\static\
xcopy /s /y ..\frontend\build\asset-manifest.json ..\backend\static\
xcopy /s /y ..\frontend\build\favicon.ico ..\backend\static\
xcopy /s /y ..\frontend\build\logo192.png ..\backend\static\
xcopy /s /y ..\frontend\build\logo512.png ..\backend\static\
echo Copying file done!