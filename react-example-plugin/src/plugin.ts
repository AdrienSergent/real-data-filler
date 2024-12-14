console.log("Le fichier plugin.js est chargé.");

// Écoute les messages provenant de React
penpot.ui.onMessage(async (rawMessage) => {
  const message = rawMessage as { type: string; contents?: string[]; [key: string]: any };
  console.log("Message reçu depuis React :", message);

  if (message.type === "updateText" && message.contents) {
    if (penpot.selection && penpot.selection.length > 0) {
      const selection = penpot.selection;

      console.log(
        `Traitement de ${selection.length} éléments sélectionnés avec ${message.contents.length} contenus fournis.`
      );

      // Mise à jour uniquement des éléments sélectionnés
      selection.forEach( async (element, index) => {
        if (element.type === "text") {
          const content = message.contents && message.contents[index]  || element.characters || "Texte d'origine";

          try {
            if (typeof element.characters !== "undefined") {
              // Mise à jour directe
              element.characters = content;
              console.log(`Élément texte ${element.id} mis à jour avec : ${content}`);
            } else {
              // Recréation si la mise à jour directe échoue
              const { x, y, style } = element;

              console.log(`Suppression de l'élément texte ${element.id}`);
              await penpot.deleteElement(element.id);

              console.log("Création d'un nouvel élément texte...");
              const newTextElement = await penpot.createText(content);

              if (newTextElement) {
                newTextElement.x = x;
                newTextElement.y = y;
                newTextElement.style = style;

                console.log(`Nouvel élément texte créé avec ID : ${newTextElement.id}`);
              } else {
                console.error("Impossible de créer un nouvel élément texte.");
              }
            }
          } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'élément texte ${element.id}:`, error);
          }
        } else {
          console.warn(`L'élément sélectionné avec l'ID ${element.id} n'est pas de type texte.`);
        }
      });

      // Informer React de la réussite globale
      penpot.ui.sendMessage({ type: "updateSuccess" });
    } else {
      console.log("Aucun élément sélectionné. Création d'un nouveau texte à une position par défaut...");

      // Génération d'un nouveau texte avec le premier contenu fourni
      const content = message.contents[0] || "Texte par défaut";

      try {
        const newTextElement = await penpot.createText(content);

        if (newTextElement) {
          // Positionner à une position fixe par défaut (ex. 100, 100)
          newTextElement.x = 100;
          newTextElement.y = 100;

          console.log(`Nouveau texte créé à la position (100, 100) avec ID : ${newTextElement.id}`);
          penpot.ui.sendMessage({ type: "updateSuccess" });
        } else {
          console.error("Impossible de créer un nouvel élément texte.");
          penpot.ui.sendMessage({
            type: "error",
            message: "Impossible de créer un nouvel élément texte.",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la création du nouvel élément texte :", error);
        penpot.ui.sendMessage({
          type: "error",
          message: "Erreur lors de la création du nouvel élément texte.",
        });
      }
    }
  } else if (message.type === "requestSelection") {
    // Envoyer les éléments actuellement sélectionnés à React
    if (penpot.selection && penpot.selection.length > 0) {
      penpot.ui.sendMessage({ type: "selectionData", elements: penpot.selection });
      console.log("Éléments de la sélection envoyés à React :", penpot.selection);
    } else {
      console.warn("Aucun élément sélectionné.");
      penpot.ui.sendMessage({
        type: "error",
        message: "Aucun élément sélectionné.",
      });
    }
  } else {
    console.warn("Type de message inconnu :", message.type);
  }
});

// Ouvrir l'interface utilisateur
penpot.ui.open("Real Data Filler", `?theme=${penpot.theme || "default"}`);
console.log("Interface utilisateur ouverte.");
