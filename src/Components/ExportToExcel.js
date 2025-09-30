/* eslint-disable prettier/prettier */
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportHVACExcel = async (hvacItems) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("HVAC");

  let rowIndex = 1;

  // სათაური
  sheet.addRow([
    "ბინა",
    "ოთახი",
    "სტრუქტურა",
    "სიგრძე",
    "სიმაღლე",
    "რაოდენობა",
    "i27",
    "j27",
    "k27",
    "L27",
    "M27",
    "N27",
    "O27",
    "P27",
    "q27",
    "r27",
    "s27",
    "t27",
    "qWinter",
    "qSummer",
    "Result",
  ]);

  const headerRow = sheet.getRow(rowIndex);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    cell.font = { bold: true, size: 12 };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "DDDDDD" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  rowIndex++;

  // სართულები
  hvacItems.forEach((floor) => {
    sheet.mergeCells(`A${rowIndex}:U${rowIndex}`);
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

    floor.apartments.forEach((apt, aptIdx) => {
      const aptStartRow = rowIndex;

      // ვთვლით ბინის შიგნით არსებული ყველა სტრუქტურის რაოდენობას
      const aptRowCount = apt.rooms.reduce(
        (sum, room) => sum + room.structures.length,
        0
      );

      // ბინის უჯრის გაერთიანება და სტილი
      sheet.mergeCells(`A${aptStartRow}:A${aptStartRow + aptRowCount - 1}`);
      const aptCell = sheet.getCell(`A${aptStartRow}`);
      aptCell.value = `ბინა ${aptIdx + 1}`;
      aptCell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      aptCell.font = { bold: true, color: { argb: "FFFFFF" } };
      aptCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "228B22" },
      };
      aptCell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // ბინის სიმაღლის დაყენება — ყველა სტრუქტურის ჯამი
      const aptMergedRow = sheet.getRow(aptStartRow);
      aptMergedRow.height = aptRowCount * 20;

      apt.rooms.forEach((room) => {
        const roomStartRow = rowIndex;
        const roomStructCount = room.structures.length;

        // ოთახის უჯრის გაერთიანება და სტილი
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
        roomCell.font = { bold: true, color: { argb: "FFFFFF" } };
        roomCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "228B22" },
        };
        roomCell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // ოთახის სიმაღლის დაყენება — მისი სტრუქტურების რაოდენობაზე დაყრდნობით
        const roomMergedRow = sheet.getRow(roomStartRow);
        roomMergedRow.height = roomStructCount * 20;

        // სტრუქტურები
        room.structures.forEach((s) => {
          const newRow = sheet.addRow([
            null,
            null,
            s.type,
            s.length,
            s.height,
            s.quantity,
            s.i27,
            s.j27,
            s.k27,
            s.L27,
            s.M27,
            s.N27,
            s.O27,
            s.P27,
            s.q27,
            s.r27,
            s.s27,
            s.t27,
            s.qWinter,
            s.qSummer,
            s.result,
          ]);

          newRow.eachCell((cell, colNumber) => {
            // ცენტრში გასწორება
            cell.alignment = { vertical: "middle", horizontal: "center" };

            // ბორდერი
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };

            // ფერები
            if (colNumber === 3) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFF99" },
              };
              cell.font = { color: { argb: "000000" } };
            } else if ([4, 5, 6].includes(colNumber)) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFF99" },
              };
              cell.font = { color: { argb: "000000" } };
            } else if (colNumber === 7) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFFFF" },
              };
              cell.font = { color: { argb: "000000" } };
            } else if ([8, 9, 12, 13, 15, 16].includes(colNumber)) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "228B22" },
              };
              cell.font = { color: { argb: "000000" } };
            } else if ([11, 17].includes(colNumber)) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "228B22" },
              };
              cell.font = { color: { argb: "FF0000" } };
            } else if ([14, 18].includes(colNumber)) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "228B22" },
              };
              cell.font = { color: { argb: "0000FF" } };
            }
          });

          rowIndex++;
        });
      });
    });
  });

  // სვეტების სიგანეები
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

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "HVAC_Styled.xlsx");
};
