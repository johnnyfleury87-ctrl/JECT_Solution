#!/bin/bash
# Script de validation : Aucune entité HTML dans le code source

echo "🔍 VALIDATION - Recherche d'entités HTML dans le code source..."
echo ""

# Exclusion du fichier utils/text.js qui contient intentionnellement ces patterns
# Exclusion des fichiers de documentation
ENTITIES_FOUND=$(grep -r --include="*.js" --include="*.jsx" --include="*.tsx" --include="*.ts" \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="text.js" \
  -E "&(apos|#39|quot|#34|nbsp|lt|gt);" . | grep -v "REFONTE_PRODORGA.md")

if [ -z "$ENTITIES_FOUND" ]; then
    echo "✅ SUCCÈS : Aucune entité HTML trouvée dans le code source"
    echo ""
    echo "Les fichiers suivants utilisent des apostrophes normales :"
    find components app -name "*.js" -exec grep -l "'" {} \; | head -10
    exit 0
else
    echo "❌ ÉCHEC : Entités HTML détectées :"
    echo "$ENTITIES_FOUND"
    exit 1
fi
