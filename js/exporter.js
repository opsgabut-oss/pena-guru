// Utilitas Ekspor untuk Modul Ajar dan Dokumen Kurikulum Merdeka
// Versi Kemendikdasmen No 13 Tahun 2025 dengan penyelarasan gaya WYSIWYG

const Exporter = {
  /**
   * Ekspor elemen HTML tertentu ke format Microsoft Word (.doc)
   * @param {string} elementId ID dari elemen HTML yang ingin diekspor
   * @param {string} fileName Nama berkas keluaran (tanpa ekspansi)
   */
  exportToWord(elementId, fileName = 'Dokumen-Kurikulum') {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Elemen dengan ID "${elementId}" tidak ditemukan.`);
      return;
    }

    // Clone element to apply custom styling for MS Word without affecting live DOM
    const clone = element.cloneNode(true);

    // Format tables programmatically for MS Word compatibility
    const tables = clone.querySelectorAll('table');
    tables.forEach(table => {
      const style = table.getAttribute('style') || '';
      if (style.includes('border: none') || style.includes('border:none')) {
        // Remove borders from layout tables (Header Identitas & Tanda Tangan)
        table.style.border = 'none';
        table.setAttribute('border', '0');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '0');
        const cells = table.querySelectorAll('td, th, tr');
        cells.forEach(cell => {
          cell.style.border = 'none';
          cell.style.padding = '4px 0';
        });
      } else {
        // Apply beautiful data table styles for MS Word
        table.setAttribute('border', '1');
        table.style.borderCollapse = 'collapse';
        table.style.border = '1px solid #a9c2be';
        table.style.width = '100%';
        table.style.margin = '12pt 0';
        
        const headers = table.querySelectorAll('th');
        headers.forEach(th => {
          th.style.backgroundColor = '#eaf4f3';
          th.style.color = '#0b5e56';
          th.style.fontWeight = 'bold';
          th.style.border = '1px solid #a9c2be';
          th.style.padding = '8px';
          th.style.textAlign = 'center';
          th.style.fontSize = '10pt';
        });

        const cells = table.querySelectorAll('td');
        cells.forEach(td => {
          td.style.border = '1px solid #a9c2be';
          td.style.padding = '8px';
          td.style.fontSize = '9.5pt';
          td.style.verticalAlign = 'top';
        });
      }
    });

    const isLandscape = element.classList.contains('landscape-sheet');
    const pageSizeStyle = isLandscape ? `
          @page WordSection1 {
            size: 29.7cm 21.0cm; /* Ukuran A4 Landscape */
            margin: 1.5cm 1.5cm 1.5cm 1.5cm; /* Margin 1.5cm */
            mso-header-margin: 35.4pt;
            mso-footer-margin: 35.4pt;
            mso-paper-source: 0;
            mso-page-orientation: landscape;
          }
    ` : `
          @page WordSection1 {
            size: 21.0cm 29.7cm; /* Ukuran A4 Portrait */
            margin: 2.0cm 2.0cm 2.0cm 2.0cm; /* Margin 2cm */
            mso-header-margin: 35.4pt;
            mso-footer-margin: 35.4pt;
            mso-paper-source: 0;
          }
    `;

    const htmlContent = clone.innerHTML;

    // Header XML khusus untuk MS Word agar mendeteksi encoding UTF-8, layout cetak A4, dan margin
    const wordHeader = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${fileName}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          ${pageSizeStyle}
          div.Section1 {
            page: WordSection1;
          }
          body {
            font-family: "Arial", "Helvetica Neue", sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333333;
          }
          h1 {
            font-size: 17pt;
            color: #0b5e56;
            font-weight: bold;
            margin-top: 10pt;
            margin-bottom: 18pt;
            text-align: center;
          }
          h2 {
            font-size: 13.5pt;
            color: #132d28;
            font-weight: bold;
            margin-top: 18pt;
            margin-bottom: 8pt;
            border-bottom: 2px solid #0b5e56;
            padding-bottom: 3pt;
            text-transform: uppercase;
          }
          h3 {
            font-size: 11.5pt;
            color: #2b3a38;
            font-weight: bold;
            margin-top: 12pt;
            margin-bottom: 4pt;
          }
          p, li {
            margin: 0 0 6pt 0;
            text-align: justify;
          }
          /* Kotak Elemen Deep Learning */
          .learning-box {
            border: 1px solid #dddddd;
            border-left: 6px solid #cccccc;
            padding: 12px;
            margin: 10pt 0;
            border-radius: 6px;
          }
          .mindful-box {
            border-left-color: #0f62fe;
            background-color: #edf3ff;
            border-color: #d2e4ff;
          }
          .meaningful-box {
            border-left-color: #d87a00;
            background-color: #fff8eb;
            border-color: #ffe8cc;
          }
          .joyful-box {
            border-left-color: #198754;
            background-color: #ebf9f1;
            border-color: #d1f2e1;
          }
          .box-header {
            font-weight: bold;
            margin-bottom: 4pt;
            font-size: 10pt;
            text-transform: uppercase;
          }
          .mindful-header { color: #0f62fe; }
          .meaningful-header { color: #d87a00; }
          .joyful-header { color: #198754; }
          
          .text-center { text-align: center; }
          .fw-bold { font-weight: bold; }
          .text-muted { color: #666666; }
        </style>
      </head>
      <body>
        <div class="Section1">
          ${htmlContent}
        </div>
      </body>
      </html>
    `;

    // Buat Blob dan trigger unduhan
    const blob = new Blob(['\ufeff' + wordHeader], {
      type: 'application/msword;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Menggunakan iframe tersembunyi untuk mencetak konten tertentu
   * Menghindari pencetakan sidebar dashboard dan control panel
   * @param {string} elementId ID dari elemen HTML yang ingin dicetak
   * @param {string} docTitle Judul dokumen cetak (untuk header halaman)
   */
  triggerPrint(elementId, docTitle = 'Cetak Dokumen Kurikulum') {
    const printElement = document.getElementById(elementId);
    if (!printElement) {
      console.error(`Elemen dengan ID "${elementId}" tidak ditemukan.`);
      return;
    }

    const isLandscape = printElement.classList.contains('landscape-sheet');
    const pageSizeSetting = isLandscape ? 'A4 landscape' : 'A4 portrait';

    // Hapus iframe print yang lama jika ada
    const existingIframe = document.getElementById('hidden-print-iframe');
    if (existingIframe) {
      existingIframe.remove();
    }

    // Buat iframe tersembunyi
    const iframe = document.createElement('iframe');
    iframe.id = 'hidden-print-iframe';
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    iframe.style.left = '-9999px';
    document.body.appendChild(iframe);

    // Ambil isi HTML
    const printHtml = printElement.innerHTML;

    // Tulis ke iframe
    const doc = iframe.contentWindow.document || iframe.contentDocument;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${docTitle}</title>
          <style>
            @media print {
              @page {
                size: ${pageSizeSetting};
                margin: 1.5cm;
              }
              body {
                background: white !important;
                color: #2b3a38 !important;
                font-family: "Arial", "Helvetica Neue", sans-serif;
                font-size: 11pt;
                line-height: 1.5;
                margin: 0;
                padding: 0;
              }
              .mso-page-break {
                page-break-before: always !important;
              }
              h1 {
                font-size: 18pt;
                color: #0b5e56 !important;
                text-align: center;
                font-weight: bold;
                margin-top: 10px;
                margin-bottom: 24px;
                page-break-after: avoid;
              }
              h2 {
                font-size: 13.5pt;
                color: #132d28 !important;
                font-weight: bold;
                margin-top: 24px;
                margin-bottom: 12px;
                border-bottom: 2px solid #0b5e56 !important;
                padding-bottom: 4px;
                text-transform: uppercase;
                page-break-after: avoid;
              }
              h3 {
                font-size: 11.5pt;
                color: #2b3a38 !important;
                font-weight: bold;
                margin-top: 16px;
                margin-bottom: 6px;
                page-break-after: avoid;
              }
              p {
                margin-bottom: 8px;
                text-align: justify;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
                page-break-inside: auto;
              }
              tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }
              thead {
                display: table-header-group;
              }
              th, td {
                border: 1px solid #777777 !important;
                padding: 8px 10px;
                text-align: left;
                vertical-align: top;
              }
              th {
                background-color: #eaf4f3 !important;
                color: #0b5e56 !important;
                font-weight: bold;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              /* Strip borders from layout tables like identity header and signoff tables */
              table[style*="border: none"] th, table[style*="border: none"] td,
              table[style*="border:none"] th, table[style*="border:none"] td {
                border: none !important;
              }
              table[style*="border: none"] tr, table[style*="border:none"] tr {
                border: none !important;
              }
              
              /* Kotak Deep Learning */
              .learning-box {
                border: 1px solid #dddddd !important;
                border-left: 6px solid #cccccc !important;
                padding: 12px 15px;
                margin: 12px 0;
                border-radius: 6px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                page-break-inside: avoid;
              }
              .mindful-box {
                border-left-color: #0f62fe !important;
                background-color: #edf3ff !important;
                border-color: rgba(15, 98, 254, 0.15) !important;
              }
              .meaningful-box {
                border-left-color: #d87a00 !important;
                background-color: #fff8eb !important;
                border-color: rgba(216, 122, 0, 0.15) !important;
              }
              .joyful-box {
                border-left-color: #198754 !important;
                background-color: #ebf9f1 !important;
                border-color: rgba(25, 135, 84, 0.15) !important;
              }
              .box-header {
                font-weight: bold;
                margin-bottom: 4px;
                font-size: 10pt;
                text-transform: uppercase;
              }
              .box-header.mindful-header { color: #0f62fe !important; }
              .box-header.meaningful-header { color: #d87a00 !important; }
              .box-header.joyful-header { color: #198754 !important; }

              .no-print {
                display: none !important;
              }
              .text-center {
                text-align: center;
              }
              .fw-bold {
                font-weight: bold;
              }
              .text-muted {
                color: #555555 !important;
              }
            }
            /* Fallback styles in frame preview */
            body {
              font-family: "Arial", sans-serif;
              font-size: 11pt;
              padding: 20px;
              color: #333333;
            }
          </style>
        </head>
        <body>
          ${printHtml}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.focus();
                window.print();
                // Close print frame after print dialog finishes
                setTimeout(function() {
                  window.parent.document.body.removeChild(window.frameElement);
                }, 500);
              }, 250);
            };
          <\/script>
        </body>
      </html>
    `);
    doc.close();
  }
};
