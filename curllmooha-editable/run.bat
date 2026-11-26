@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules (
  echo 正在安装依赖...
  call npm install
)
echo 启动开发服务器： http://127.0.0.1:8899/
call npm run dev
pause
