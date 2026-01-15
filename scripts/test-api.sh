#!/bin/bash

# Script de test rapide des endpoints API
# Usage: ./test-api.sh [URL_BASE]
# Exemple: ./test-api.sh http://localhost:3000
#          ./test-api.sh https://votre-domaine.vercel.app

BASE_URL="${1:-http://localhost:3000}"
SESSION_ID="test-$(date +%s)-$$"

echo "🧪 Test des endpoints API - JETC Solution"
echo "=========================================="
echo "Base URL: $BASE_URL"
echo "Session ID: $SESSION_ID"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: /api/ping sans sessionId (devrait échouer)
echo "📍 Test 1: POST /api/ping (sans sessionId)"
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/ping" \
  -H "Content-Type: application/json" \
  -d '{}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "400" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Code: $HTTP_CODE (attendu: 400)"
  echo "Réponse: $BODY"
else
  echo -e "${RED}❌ FAIL${NC} - Code: $HTTP_CODE (attendu: 400)"
  echo "Réponse: $BODY"
fi
echo ""

# Test 2: /api/ping avec sessionId (devrait réussir ou 503 si pas de Redis)
echo "📍 Test 2: POST /api/ping (avec sessionId)"
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/ping" \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\": \"$SESSION_ID\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "503" ]; then
  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Code: $HTTP_CODE (Redis configuré)"
  else
    echo -e "${YELLOW}⚠️  WARN${NC} - Code: $HTTP_CODE (Redis non configuré - normal en local)"
  fi
  echo "Réponse: $BODY"
else
  echo -e "${RED}❌ FAIL${NC} - Code: $HTTP_CODE (attendu: 200 ou 503)"
  echo "Réponse: $BODY"
fi
echo ""

# Test 3: /api/active
echo "📍 Test 3: GET /api/active"
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/active")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Code: $HTTP_CODE"
  echo "Réponse: $BODY"
  
  # Extraire le nombre d'actifs
  ACTIVE=$(echo "$BODY" | grep -o '"active":[0-9]*' | cut -d: -f2)
  echo "Utilisateurs actifs: $ACTIVE"
else
  echo -e "${RED}❌ FAIL${NC} - Code: $HTTP_CODE (attendu: 200)"
  echo "Réponse: $BODY"
fi
echo ""

# Test 4: /api/stats
echo "📍 Test 4: GET /api/stats"
echo "-------------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/stats")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Code: $HTTP_CODE"
  echo "Réponse: $BODY"
else
  echo -e "${RED}❌ FAIL${NC} - Code: $HTTP_CODE (attendu: 200)"
  echo "Réponse: $BODY"
fi
echo ""

# Test 5: Vérifier les headers Cache-Control
echo "📍 Test 5: Vérification Cache-Control headers"
echo "-------------------------------------------"
HEADERS=$(curl -s -I "$BASE_URL/api/active" | grep -i "cache-control")

if echo "$HEADERS" | grep -q "no-store"; then
  echo -e "${GREEN}✅ PASS${NC} - Cache-Control contient 'no-store'"
  echo "Headers: $HEADERS"
else
  echo -e "${RED}❌ FAIL${NC} - Cache-Control ne contient pas 'no-store'"
  echo "Headers: $HEADERS"
fi
echo ""

# Résumé
echo "=========================================="
echo "✅ Tests terminés"
echo ""
echo "💡 Notes:"
echo "- Si vous voyez 503 pour /api/ping: Redis n'est pas configuré (normal en local sans .env.local)"
echo "- Si tous les compteurs sont à 0: Redis n'est pas configuré ou vide"
echo "- En production, vérifiez que UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN sont définis"
echo ""
echo "📚 Voir aussi:"
echo "- TEST_ACTIVE_USERS.md pour les tests complets"
echo "- DEPLOIEMENT_STATS_PRODUCTION.md pour la configuration Vercel"
