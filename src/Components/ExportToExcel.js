/* eslint-disable prettier/prettier */
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportHVACExcel = async (hvacItems) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("HVAC");

  let rowIndex = 1;

  // Header
  const headerTitles = [
    { text: "ბინა" },
    { text: "ოთახი" },
    { text: "სტრუქტურა" },
    { text: "სიგრძე" }, //bgColor: "FFFF00"
    { text: "სიმაღლე" }, // bgColor: "FFFF00"
    { text: "რაოდენობა" }, // bgColor: "FFFF00"
    { text: "ფართი  m²" },
    { text: "კონსტრუქციის თბოგადაცემის კოეფიციენტი k , wat/m²C" },
    { text: "შიდა", fontColor: "FF0000" },
    { text: "გარე", fontColor: "FF0000" },
    { text: "ტემპერატურული სხვაობა (tS-tg)n", fontColor: "FF0000" },
    { text: "შიდა", fontColor: "0000FF" },
    { text: "გარე", fontColor: "FF0000" },
    { text: "ტემპერატურული სხვაობა (tS-tg)n", fontColor: "0000FF" },
    { text: "ჰორიზონტის მხარეებზე ორიენტაცია", fontColor: "FF0000" },
    { text: "დანამატი ინფილტრაციაზე", fontColor: "FF0000" },
    { text: "სათავსოს საბოლოო ტბოდანაკარგი vt.", fontColor: "FF0000" },
    { text: "კონსტრუქციიდან შემოსული სიტბო vt", fontColor: "0000FF" },
    { text: "კონსტრუქციის ორიენტაცია მხარეების მიხედვით" },
    { text: "ერთეული" },
    { text: "შემასწორებელი კოეფიციენტი K1" },
    { text: "შემოსული სითბო w." },
    { text: "წყაროს დასახელება" },
    { text: "მათი რაოედენობა" }, // ყვითელი ფონი bgColor: "FFFF00"
    { text: "ერთეულზე მოსული სითბო WAT" },
    { text: "შემასწორებელი კოეფიციენტი K1" },
    { text: "ჯამი WAT" },
    { text: "ერთეული w/m2" },
    { text: "მთლიანი ფართი m2" },
    { text: "ჯამი" },
    { text: "სითბოს მოდინება WAT" },
    { text: "საბოლოო თბოდანაკარგი kvt", fontColor: "FF0000" },
    { text: "საბოლოო სითბოს მოდინება kvt", fontColor: "0000FF" },
  ];
  const headerRow = sheet.addRow(headerTitles.map((h) => h.text));
  headerRow.height = 100;

  headerRow.eachCell((cell, colNumber) => {
    const header = headerTitles[colNumber - 1]; // because colNumber is 1-based
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      textRotation: 90,
      wrapText: true,
    };
    cell.font = {
      bold: true,
      size: 11,
      color: { argb: header?.fontColor || "FF000000" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: header?.bgColor || "FFFFFFFF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  rowIndex++;
  const getExcelColumnLetter = (colIndex) => {
    let letter = "";
    while (colIndex > 0) {
      const remainder = (colIndex - 1) % 26;
      letter = String.fromCharCode(65 + remainder) + letter;
      colIndex = Math.floor((colIndex - 1) / 26);
    }
    return letter;
  };

  const lastColLetter = getExcelColumnLetter(headerTitles.length);
  // Iterate Floors
  hvacItems.forEach((floor) => {
    sheet.mergeCells(`A${rowIndex}:${lastColLetter}${rowIndex}`);
    const floorCell = sheet.getCell(`A${rowIndex}`);
    floorCell.value = `სართული: ${floor.floorName}`;
    floorCell.alignment = { vertical: "middle", horizontal: "center" };
    floorCell.font = { bold: true, color: { argb: "FF0000" }, size: 14 };
    floorCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCD5CE" },
    };
    floorCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    rowIndex++;

    // Iterate Apartments
    floor.apartments.forEach((apt, aptIdx) => {
      const aptStartRow = rowIndex;

      // Calculate how many total structures this apartment has
      const aptRowCount = apt.rooms.reduce(
        (sum, room) => sum + room.structures.length,
        0
      );
      // Merge Apartment cell
      sheet.mergeCells(`A${aptStartRow}:A${aptStartRow + aptRowCount - 1}`);
      const aptCell = sheet.getCell(`A${aptStartRow}`);
      aptCell.value = `ბინა ${aptIdx + 1}`;
      aptCell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      aptCell.font = { bold: true, color: { argb: "FF000000" } };
      aptCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      };
      aptCell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // For each room
      apt.rooms.forEach((room) => {
        const roomStartRow = rowIndex;
        const roomStructCount = room.structures.length;
        // Merge Room cell
        sheet.mergeCells(
          `B${roomStartRow}:B${roomStartRow + roomStructCount - 1}`
        );
        const roomCell = sheet.getCell(`B${roomStartRow}`);
        roomCell.value = room.name;
        roomCell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        roomCell.font = { bold: true, color: { argb: "FF000000" } };
        roomCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF32CD32" },
        };
        roomCell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // Structures

        headerRow.height = 100;
        const sumS27 = room.structures.reduce((sum, s) => {
          const s27 = s.s27;
          return sum + s27;
        }, 0);

        const sumS = sumS27 / 1000;
        const sumAg27 = room.structures.reduce((sum, s) => {
          const ag27 = s.ag27;

          return sum + ag27;
        }, 0);
        const sumG = sumAg27 / 1000;
        room.structures.forEach((s) => {
          const structureTitles = [
            null,
            null,
            { text: s.type }, //bgColor: "FFFF00"
            {
              text: s.length || " bababa",
            }, //bgColor: "FFFF00",
            { text: s.height || " " }, //bgColor: "FFFF00"
            { text: s.quantity || " " }, //bgColor: "FFFF00"
            {
              text: s.i27 ? s.i27 : s.Mm27,
            }, //bgColor: s.i27 ? "FFFFFFFF" : "FFFF00",
            { text: s.j27 },
            { text: s.k27, fontColor: "FF0000" },
            { text: s.L27, fontColor: "FF0000" },
            { text: s.M27, fontColor: "FF0000" },
            { text: s.N27, fontColor: "0000FF" },
            { text: s.O27, fontColor: "FF0000" },
            { text: s.P27, fontColor: "0000FF" },
            { text: s.q27, fontColor: "FF0000" },
            { text: s.r27, fontColor: "FF0000" },
            { text: s.s27, fontColor: "FF0000" },
            { text: s.t27, fontColor: "0000FF" },
            s.x27 === 0 ? null : { text: s.sunnyLabel }, //bgColor: "FFFF00"
            s.x27 === 0 ? null : { text: s.v27 },
            s.x27 === 0 ? null : { text: s.w27 },
            s.x27 === 0 ? null : { text: s.x27, fontColor: "0000FF" },
            s.x27 === 0 ? null : { text: s.y27 },
            s.x27 === 0 ? null : { text: s.z27 }, //bgColor: "FFFF00"
            s.x27 === 0 ? null : { text: s.aa27 },
            s.x27 === 0 ? null : { text: s.ab27 },
            s.x27 === 0 ? null : { text: s.ac27, fontColor: "0000FF" },
            s.x27 === 0 ? null : { text: s.ad27 },
            s.x27 === 0 ? null : { text: s.Mm27 }, //bgColor: "FFFF00"
            s.x27 === 0 ? null : { text: s.af27, fontColor: "0000FF" },
            //
            { text: s.ag27 },
            { text: sumS.toFixed(2), fontColor: "FF0000" },
            { text: sumG.toFixed(2), fontColor: "0000FF" },
          ];

          // 🟢 სტრუქტურის რიგი
          // const newRow = sheet.addRow(structureTitles.map((h) => h.text));
          const newRow = sheet.addRow(
            structureTitles.map((h) => h?.text ?? null)
          );
          // 🟢 თითო უჯრაზე დავადოთ style იგივე ობიექტიდან
          newRow.eachCell((cell, colNumber) => {
            const style = structureTitles[colNumber - 1]; // index adjustment

            cell.alignment = { vertical: "middle", horizontal: "center" };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };

            cell.font = {
              bold: true,
              size: 11,
              color: { argb: style?.fontColor || "FF000000" },
            };

            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: style?.bgColor || "FFFFFFFF" },
            };
          });

          rowIndex++;
        });
        // room.structures.forEach((s) => {
        //   const newRow = sheet.addRow([
        //     null,
        //     null,
        //     s.type,
        //     s.length,
        //     s.height,
        //     s.quantity,
        //     s.i27,
        //     s.j27,
        //     s.k27,
        //     s.L27,
        //     s.M27,
        //     s.N27,
        //     s.O27,
        //     s.P27,
        //     s.q27,
        //     s.r27,
        //     s.s27,
        //     s.t27,
        //     s.sunnyLabel, // ყვითელი ბგ
        //     s.v27,
        //     s.w27,
        //     s.x27, // ლურჯი ტექსტი მწვანე ბგ
        //     s.y27,
        //     s.z27, // ყვითი ბგ
        //     s.aa27,
        //     s.ab27,
        //     s.ac27, // ლურჯი ტექსტი მწვანე ბგ
        //     s.ad27,
        //     s.Mm27, // ყვითელი ბგ
        //     s.af27, // ლურჯი ტექსტი მწვანე ბგ
        //     s.ag27,
        //     // s.qWinter,
        //     // s.qSummer,
        //     // s.result,
        //   ]);

        //   // Apply cell styles
        //   newRow.eachCell((cell, colNumber) => {
        //     cell.alignment = { vertical: "middle", horizontal: "center" };
        //     cell.border = {
        //       top: { style: "thin" },
        //       left: { style: "thin" },
        //       bottom: { style: "thin" },
        //       right: { style: "thin" },
        //     };

        //     if ([3, 4, 5, 6].includes(colNumber)) {
        //       cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF99" } };
        //       cell.font = { color: { argb: "000000" } };
        //     } else if ([7].includes(colNumber)) {
        //       cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF" } };
        //     } else if ([8, 9, 12, 13, 15, 16].includes(colNumber)) {
        //       cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "228B22" } };
        //       cell.font = { color: { argb: "000000" } };
        //     } else if ([11, 17].includes(colNumber)) {
        //       cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "228B22" } };
        //       cell.font = { color: { argb: "FF0000" } };
        //     } else if ([14, 18].includes(colNumber)) {
        //       cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "228B22" } };
        //       cell.font = { color: { argb: "0000FF" } };
        //     }
        //   });

        //   // 🔥 აქ უნდა გაიზარდოს rowIndex სტრუქტურისთვის!
        //   rowIndex++;
        // });
      });
    });
  });

  // Column widths
  sheet.columns = [
    { width: 12 }, // ბინა
    { width: 18 }, // ოთახი
    { width: 20 }, // სტრუქტურა
    { width: 10 },
    { width: 10 },
    { width: 12 },
    { width: 10 },
    { width: 10 },
    { width: 12 },
    { width: 12 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
  ];

  // Save the file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "HVAC_Styled.xlsx");
};
