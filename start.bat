@echo off
REM Quick Start Script for Acquisitions API - Windows
REM This script helps developers get started quickly

echo.
echo ================================
echo Acquisitions API - Quick Start
echo ================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Docker is not installed. Please install Docker Desktop first.
    echo     Visit: https://docs.docker.com/desktop/install/windows-install/
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Docker Compose is not installed.
    pause
    exit /b 1
)

echo [OK] Docker is installed
echo [OK] Docker Compose is installed
echo.

REM Ask user which environment to start
echo Which environment do you want to start?
echo 1) Development (with Neon Local)
echo 2) Production (with Neon Cloud)
echo 3) Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Starting Development Environment...
    echo This will start:
    echo   - PostgreSQL database
    echo   - Neon Local proxy
    echo   - Your application with hot-reload
    echo.
    
    if not exist .env.development (
        echo [!] .env.development not found. It will be created with default values.
        echo     You may need to edit it after starting.
    )
    
    echo Starting services...
    docker-compose -f docker-compose.dev.yml up --build
) else if "%choice%"=="2" (
    echo.
    echo Starting Production Environment...
    echo.
    
    if not exist .env.production (
        echo [X] .env.production not found!
        echo     Please create it with your production Neon Cloud credentials.
        echo     See .env.example for reference.
        pause
        exit /b 1
    )
    
    echo [!] WARNING: You are about to start in PRODUCTION mode!
    echo     Make sure your .env.production has the correct Neon Cloud URL.
    echo.
    set /p confirm="Continue? (y/n): "
    
    if /i "%confirm%"=="y" (
        echo Starting services...
        docker-compose -f docker-compose.prod.yml up --build
    ) else (
        echo Cancelled.
        exit /b 0
    )
) else if "%choice%"=="3" (
    echo Goodbye!
    exit /b 0
) else (
    echo [X] Invalid choice. Please run the script again.
    pause
    exit /b 1
)
