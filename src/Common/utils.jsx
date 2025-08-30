import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function formatPrice(amount = 0, locale = "en-IN", currency = "INR") {
  if (typeof amount === "string") {
    amount = amount.replace(/,/g, "");
  }
  let num = Number(amount);
  if (isNaN(num)) {
    num = 0;
  }

  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (currency) {
    options.style = "currency";
    options.currency = currency;
  }

  return num.toLocaleString(locale, options);
}

// Load image from URL and return Base64
const getImageBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      resolve({ base64: reader.result, type: blob.type });
    reader.readAsDataURL(blob);
  });
};

export const generatePdf = async (menuItems) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Menu Items Report", 14, 20);

  // Load images
  const body = await Promise.all(
    menuItems.map(async (item, index) => {
      const { base64, type } = await getImageBase64(item.image_url);
      return {
        no: index + 1,
        image: base64,
        imageType: type.includes("png") ? "PNG" : "JPEG", // auto detect
        name: item.name,
        taste: item.taste,
        price: item.price,
        description: item.description,
      };
    })
  );

  autoTable(doc, {
    startY: 30,
    head: [["No.", "Image", "Name", "Taste", "Price", "Description"]],
    body: body.map((row) => [
      row.no,
      "", // placeholder for image
      row.name,
      row.taste,
      row.price,
      row.description,
    ]),
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: "middle",
    },
    headStyles: {
      fillColor: [0, 123, 255],
      textColor: 255,
      fontStyle: "bold",
    },
    columnStyles: {
      1: { cellWidth: 28 }, // adjust image column width
    },
    didDrawCell: (data) => {
      if (data.column.index === 1 && data.cell.section === "body") {
        const rowData = data.row.raw;
        if (rowData.image) {
          try {
            doc.addImage(
              rowData.image,
              rowData.imageType, // PNG or JPEG
              data.cell.x + 2,
              data.cell.y + 2,
              24,
              20
            );
          } catch (e) {
            console.warn("Image insert failed for row", data.row.index, e);
          }
        }
      }
    },
  });

  doc.save("menu_items.pdf");
};
