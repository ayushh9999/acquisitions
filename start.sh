#!/bin/bash

# Quick Start Script for Acquisitions API
# This script helps developers get started quickly

set -e

echo "🚀 Acquisitions API - Quick Start"
echo "=================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker is installed"
echo "✅ Docker Compose is installed"
echo ""

# Ask user which environment to start
echo "Which environment do you want to start?"
echo "1) Development (with Neon Local)"
echo "2) Production (with Neon Cloud)"
echo "3) Exit"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔧 Starting Development Environment..."
        echo "This will start:"
        echo "  - PostgreSQL database"
        echo "  - Neon Local proxy"
        echo "  - Your application with hot-reload"
        echo ""
        
        # Check if .env.development exists
        if [ ! -f .env.development ]; then
            echo "⚠️  .env.development not found. It will be created with default values."
            echo "   You may need to edit it after starting."
        fi
        
        echo "Starting services..."
        docker-compose -f docker-compose.dev.yml up --build
        ;;
    2)
        echo ""
        echo "🚀 Starting Production Environment..."
        echo ""
        
        # Check if .env.production exists
        if [ ! -f .env.production ]; then
            echo "❌ .env.production not found!"
            echo "   Please create it with your production Neon Cloud credentials."
            echo "   See .env.example for reference."
            exit 1
        fi
        
        # Warn about production
        echo "⚠️  WARNING: You are about to start in PRODUCTION mode!"
        echo "   Make sure your .env.production has the correct Neon Cloud URL."
        echo ""
        read -p "Continue? (y/n): " confirm
        
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            echo "Starting services..."
            docker-compose -f docker-compose.prod.yml up --build
        else
            echo "Cancelled."
            exit 0
        fi
        ;;
    3)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
