const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Helper to replace matching block
function replaceBlock(source, startMarker, endMarker, replacement) {
  const startIndex = source.indexOf(startMarker);
  if (startIndex === -1) {
    console.error("Could not find start marker:", startMarker.substring(0, 100));
    process.exit(1);
  }
  const endIndex = source.indexOf(endMarker, startIndex);
  if (endIndex === -1) {
    console.error("Could not find end marker:", endMarker.substring(0, 100));
    process.exit(1);
  }
  const actualEndIndex = endIndex + endMarker.length;
  return source.substring(0, startIndex) + replacement + source.substring(actualEndIndex);
}

// --- generateDetailedLkpd ---

// 1. Matematika Fallback
content = replaceBlock(content,
  `      // Level 2: Meeting Index Falling back (for Matematika)`,
  `  } else if (category === "indonesia") {`,
  `      // Level 2: Meeting Index Falling back (for Matematika)
      lkpdHtml = qa.lkpdExercises;
    }
  } else if (category === "indonesia") {`
);

// 2. Indonesia Fallback
content = replaceBlock(content,
  `      // Level 2: Meeting Index Falling back (for Indonesia)`,
  `  } else {
    // Other subjects (Pancasila, PAI, IPAS, PJOK, Senirupa, English, Jawa, Koding)`,
  `      // Level 2: Meeting Index Falling back (for Indonesia)
      lkpdHtml = qa.lkpdExercises;
    }
  } else {
    // Other subjects (Pancasila, PAI, IPAS, PJOK, Senirupa, English, Jawa, Koding)`
);

// 3. Pancasila Fallback
content = replaceBlock(content,
  `// Meeting fallback for Pancasila`,
  `    } else if (category === "pai") {`,
  `// Meeting fallback for Pancasila
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "pai") {`
);

// 4. PAI Fallback
content = replaceBlock(content,
  `// Meeting fallback for PAI`,
  `    } else if (category === "ipas") {`,
  `// Meeting fallback for PAI
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "ipas") {`
);

// 5. IPAS Fallback
content = replaceBlock(content,
  `// Meeting fallback for IPAS`,
  `    } else if (category === "pjok") {`,
  `// Meeting fallback for IPAS
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "pjok") {`
);

// 6. PJOK Fallback
content = replaceBlock(content,
  `// Meeting fallback for PJOK`,
  `    } else if (category === "senirupa") {`,
  `// Meeting fallback for PJOK
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "senirupa") {`
);

// 7. Senirupa Fallback
content = replaceBlock(content,
  `// Meeting fallback for Seni Rupa`,
  `    } else if (category === "english") {`,
  `// Meeting fallback for Seni Rupa
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "english") {`
);

// 8. English Fallback
content = replaceBlock(content,
  `// Meeting fallback for English`,
  `    } else if (category === "jawa") {`,
  `// Meeting fallback for English
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "jawa") {`
);

// 9. Jawa Fallback
content = replaceBlock(content,
  `// Meeting fallback for Jawa`,
  `    } else if (category === "koding") {`,
  `// Meeting fallback for Jawa
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "koding") {`
);

// 10. Koding Fallback
content = replaceBlock(content,
  `// Meeting fallback for Koding`,
  `    } else {
      lkpdHtml = \`
        <p><b>A. Tujuan Aktivitas:</b><br>Memahami materi secara mendalam`,
  `// Meeting fallback for Koding
        lkpdHtml = qa.lkpdExercises;
      }
    } else {
      lkpdHtml = \`
        <p><b>A. Tujuan Aktivitas:</b><br>Memahami materi secara mendalam`
);


// --- generateDetailedAsesmen ---

// 1. Matematika Fallback
content = replaceBlock(content,
  `      // Matematika general meeting-level fallback`,
  `    }

    return \`
      <div style="border: 1px solid var(--border-color); padding: 20px;`,
  `      // Matematika general meeting-level fallback
      testQuestions = qa.rubricExercises + \`
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>\${qa.kunciJawaban}</p>
      \`;
      rubricTable = \`
        <tr>
          <td><b>Pemahaman Konsep</b></td>
          <td>Sangat memahami konsep dasar materi secara mendalam dan mampu menjelaskan/menerapkannya secara tepat.</td>
          <td>Memahami konsep dasar materi tetapi masih melakukan sedikit kesalahan penafsiran.</td>
          <td>Belum menguasai kompetensi dasar dari topik yang dipelajari.</td>
        </tr>
      \`;
    }

    return \`
      <div style="border: 1px solid var(--border-color); padding: 20px;"`
);

// 2. Indonesia Fallback
content = replaceBlock(content,
  `      // Bahasa Indonesia general meeting-level fallback`,
  `    }

    return \`
      <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h3 class="text-center" style="margin-top:0; color: var(--primary); text-transform: uppercase;">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>`,
  `      // Bahasa Indonesia general meeting-level fallback
      testQuestions = qa.rubricExercises + \`
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>\${qa.kunciJawaban}</p>
      \`;
      rubricTable = \`
        <tr>
          <td><b>Pemahaman Konsep</b></td>
          <td>Sangat memahami konsep dasar materi secara mendalam dan mampu menjelaskan/menerapkannya secara tepat.</td>
          <td>Memahami konsep dasar materi tetapi masih melakukan sedikit kesalahan penafsiran.</td>
          <td>Belum menguasai kompetensi dasar dari topik yang dipelajari.</td>
        </tr>
      \`;
    }

    return \`
      <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h3 class="text-center" style="margin-top:0; color: var(--primary); text-transform: uppercase;">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>`
);

// 3. Fallbacks for other subjects in Asesmen
content = replaceBlock(content,
  `  // Fallbacks for other subjects (Pancasila, PAI, IPAS, PJOK, Senirupa, English, Jawa, Koding)
  let task1 = \`\`;
  let rubRows = \`\`;

  if (category === "pancasila") {`,
  `      <tr>
        <td><b>Kemandirian Tugas</b></td>
        <td>Mengerjakan tugas secara mandiri, jujur, penuh konsentrasi, dan mengumpulkan tepat waktu.</td>
        <td>Mengerjakan tugas mandiri tetapi mudah teralihkan konsentrasinya oleh keadaan sekitar.</td>
        <td>Selalu meminta bantuan penuh dari orang lain untuk menyelesaikan tugas sederhana.</td>
      </tr>
    \`;
  }

  return \`
    <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">`,
  `  // Fallbacks for other subjects (Pancasila, PAI, IPAS, PJOK, Senirupa, English, Jawa, Koding)
  let task1 = qa.rubricExercises + \`
    <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
    <p>\${qa.kunciJawaban}</p>
  \`;
  let rubRows = \`
    <tr>
      <td><b>Pemahaman Konsep</b></td>
      <td>Sangat memahami konsep dasar materi secara mendalam dan mampu menjelaskan/menerapkannya secara tepat.</td>
      <td>Memahami konsep dasar materi tetapi masih melakukan sedikit kesalahan penafsiran.</td>
      <td>Belum menguasai kompetensi dasar dari topik yang dipelajari.</td>
    </tr>
    <tr>
      <td><b>Kemandirian Tugas</b></td>
      <td>Mengerjakan tugas secara mandiri, jujur, penuh konsentrasi, dan mengumpulkan tepat waktu.</td>
      <td>Mengerjakan tugas mandiri tetapi mudah teralihkan konsentrasinya oleh keadaan sekitar.</td>
      <td>Selalu meminta bantuan penuh dari orang lain untuk menyelesaikan tugas sederhana.</td>
    </tr>
  \`;

  return \`
    <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Modified successfully!");
