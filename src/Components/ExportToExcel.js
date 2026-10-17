/* eslint-disable prettier/prettier */
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
const applyOuterBorder = (sheet, totalCols) => {
  const medium = { style: "medium", color: { argb: "FF000000" } };
  const firstRow = 1;
  const lastRow = sheet.rowCount;

  for (let r = firstRow; r <= lastRow; r++) {
    for (let c = 1; c <= totalCols; c++) {
      const cell = sheet.getCell(r, c);
      const border = { ...(cell.border || {}) };

      if (r === firstRow) border.top = medium;
      if (r === lastRow) border.bottom = medium;
      if (c === 1) border.left = medium;
      if (c === totalCols) border.right = medium;

      cell.border = border;
    }
  }
};
const buildGroupedHeader = (
  sheet,
  headerTitles,
  groups,
  superGroups = [],
  mainTitles = []
) => {
  const total = headerTitles.length;
  const thin = { style: "thin" };
  const hasSuper = superGroups.length > 0;
  const empty = () => Array(total).fill(null);
  // const levels = hasSuper ? 3 : 2;
  // მთავარი სათაურები (ყველაზე ზედა რიგი)
  if (mainTitles.length > 0) {
    const rowMain = sheet.addRow(empty());
    rowMain.height = Math.max(...mainTitles.map((m) => m.height ?? 40));

    // გადაფარვის შემოწმება
    const usedMain = new Set();
    mainTitles.forEach((m) => {
      for (let c = m.start; c <= m.end; c++) {
        if (usedMain.has(c))
          throw new Error(`main title "${m.title}" გადაფარავს სვეტს ${c}-ს`);
        usedMain.add(c);
      }
    });

    mainTitles.forEach((m) => {
      const side = { style: m.borderStyle || "medium" };
      for (let c = m.start; c <= m.end; c++) {
        const cell = rowMain.getCell(c);
        cell.border = { top: side, left: side, bottom: side, right: side };
        // fill აღარ გვაქვს, ფონი უფერო რჩება
      }

      const mainCell = rowMain.getCell(m.start);
      mainCell.value = m.title;
      mainCell.alignment = { vertical: "middle", horizontal: "center" };
      mainCell.font = {
        bold: true,
        size: m.size ?? 16,
      };

      if (m.end > m.start) {
        sheet.mergeCells(rowMain.number, m.start, rowMain.number, m.end);
      }
    });
  }
  // გადაფარვის შემოწმება
  const used = new Set();
  groups.forEach((g) => {
    g.end = g.start + g.subs.length - 1;
    for (let c = g.start; c <= g.end; c++) {
      if (used.has(c))
        throw new Error(`ჯგუფი "${g.title}" გადაფარავს სვეტს ${c}-ს`);
      used.add(c);
    }
  });
  const usedSuper = new Set();
  superGroups.forEach((sg) => {
    for (let c = sg.start; c <= sg.end; c++) {
      if (usedSuper.has(c))
        throw new Error(`დიდი ჯგუფი "${sg.title}" გადაფარავს სვეტს ${c}-ს`);
      usedSuper.add(c);
    }
  });

  const groupAt = {};
  const subAt = {};
  const superAt = {};
  groups.forEach((g) => {
    g.subs.forEach((s, i) => {
      groupAt[g.start + i] = g;
      subAt[g.start + i] = s;
    });
  });
  superGroups.forEach((sg) => {
    for (let c = sg.start; c <= sg.end; c++) superAt[c] = sg;
  });

  // რიგების შექმნა
  const rowSuper = hasSuper ? sheet.addRow(empty()) : null;
  const rowGroup = sheet.addRow(empty());
  const rowSub = sheet.addRow(empty());
  const r0 = (rowSuper || rowGroup).number; // პირველი header-ის რიგი
  const rGroup = rowGroup.number;
  const rLast = rowSub.number;

  // მნიშვნელობები
  superGroups.forEach((sg) => {
    rowSuper.getCell(sg.start).value = sg.title;
  });
  groups.forEach((g) => {
    if (g.title) rowGroup.getCell(g.start).value = g.title;
  });

  for (let c = 1; c <= total; c++) {
    if (subAt[c]) {
      const g = groupAt[c];
      const target = g.title ? rowSub : rowGroup;
      target.getCell(c).value = subAt[c].text;
    } else {
      const top = hasSuper && !superAt[c] ? r0 : rGroup;
      sheet.getCell(top, c).value = headerTitles[c - 1].text;
    }
  }
  // სიმაღლეები
  if (rowSuper) rowSuper.height = 30;
  rowGroup.height = 60;
  rowSub.height = 80;

  // merge-ები
  superGroups.forEach((sg) => {
    if (sg.end > sg.start) sheet.mergeCells(r0, sg.start, r0, sg.end);
  });

  groups.forEach((g) => {
    if (g.title) {
      if (g.end > g.start) sheet.mergeCells(rGroup, g.start, rGroup, g.end);
    } else {
      // title არ არის: თითო ქვესათაური გაჭიმე rGroup-იდან rLast-მდე
      for (let c = g.start; c <= g.end; c++) {
        sheet.mergeCells(rGroup, c, rLast, c);
      }
    }
  });
  for (let c = 1; c <= total; c++) {
    if (groupAt[c]) continue;
    const startRow = hasSuper && !superAt[c] ? r0 : rGroup;
    if (startRow < rLast) sheet.mergeCells(startRow, c, rLast, c);
  }

  // სტილები
  const rows = rowSuper ? [rowSuper, rowGroup, rowSub] : [rowGroup, rowSub];
  rows.forEach((row, rIdx) => {
    for (let c = 1; c <= total; c++) {
      const cell = row.getCell(c);
      const isSuperTitle = hasSuper && rIdx === 0 && !!superAt[c];

      const isGroupTitle =
        rIdx === (hasSuper ? 1 : 0) && !!groupAt[c] && !!groupAt[c].title;
      const isTitle = isSuperTitle || isGroupTitle;
      let src;
      if (isSuperTitle) src = superAt[c];
      else if (isGroupTitle) src = groupAt[c];
      else src = subAt[c] ?? headerTitles[c - 1];

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        textRotation: src?.rotation ?? (isTitle ? 0 : 90),
        wrapText: true,
      };
      cell.font = {
        // bold: true,
        size: 11,
        color: { argb: isTitle ? "FF000000" : src?.fontColor || "FF000000" },
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: src?.bgColor || "FFFFFFFF" },
      };
      cell.border = { top: thin, left: thin, bottom: thin, right: thin };
    }
  });
};
const flattenHeader = (config) => {
  const headerTitles = []; // ბრტყელი სია (ყველა სვეტი)
  const groups = [];
  const superGroups = [];

  const addItem = (item) => {
    if (item.subs) {
      groups.push({
        title: item.title,
        start: headerTitles.length + 1,
        subs: item.subs,
      });
      item.subs.forEach((s) => headerTitles.push(s));
    } else {
      headerTitles.push(item);
    }
  };

  config.forEach((node) => {
    if (node.items) {
      const start = headerTitles.length + 1;
      node.items.forEach(addItem);
      superGroups.push({
        title: node.superTitle,
        start,
        end: headerTitles.length,
        bgColor: node.bgColor,
      });
    } else {
      addItem(node);
    }
  });

  const widths = headerTitles.map((h) => h.width ?? 14);
  return { headerTitles, groups, superGroups, widths };
};
export const exportHVACExcel = async (hvacItems) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("HVAC");

  // let rowIndex = 1;

  // Header
  const headerConfig = [
    {
      superTitle: "კონსტრუქციების აღწერა",
      items: [
        { text: "სტრუქტურა", width: 20 },
        {
          title: "ჰაერის ტემპერატურული პარამეტრები",
          subs: [
            { text: "TS", width: 6 },
            { text: "Tg", width: 6 },
            { text: "TS-Tg", width: 6 },
          ],
        },
        {
          title: "კონსტრუქციის ზომები",
          subs: [
            { text: "სიგრძე", width: 8 },
            { text: "სიმაღლე", width: 8 },
          ],
        },
        {
          title: "ფართი m2",
          subs: [
            { text: "რაოდენობა", width: 8 },
            { text: "სულ", width: 8 },
          ],
        },
        { text: "K", width: 8, rotation: 0 },
        {
          title: "დანამატები",
          subs: [
            { text: "მხარეებზე", width: 8 },
            { text: "ინფილტრაცია", width: 8 },
          ],
        },
      ],
    },
    {
      superTitle: "სითბოს დანაკარგი",
      items: [
        {
          subs: [
            { text: "Qwt", width: 12 },
            { text: "Qkv", width: 12, fontColor: "FF0000" },
          ],
        },
      ],
    },
    {
      superTitle: "კონსტრუქციებიდან",
      items: [
        {
          title: "ჰაერის ტემპერატურული პარამეტრები",
          subs: [
            { text: "TS", width: 6 },
            { text: "Tg", width: 6 },
            { text: "TS-Tg", width: 6 },
          ],
        },
        { text: "შემოსული სითბო W", fontColor: "FF0000FF", width: 12 },
      ],
    },
    {
      superTitle: "ვიტრაჟიდან შემოსული რადიაცია",
      items: [
        { text: "კონსტრუქციის ორიენტაცია მხარეების მიხედვით", width: 12 },
        { text: "ფართი  m2", width: 8 },
        { text: "ერთეული  w/m2", width: 8 },
        { text: "შემასწორებელი კოეფიციენტი K1", width: 8 },
        { text: "შემოსული სითბო W", width: 12 },
      ],
    },
    {
      superTitle: "სითბოს მოდინების სხვა წყაროები",
      items: [
        { text: "წყაროს დასახელება", width: 12 },
        { text: "მათი რაოდენობა", width: 8 },
        { text: "ერთეულზე მოსული სითბო WAT", width: 8 },
        { text: "შემასწორებელი კოეფიციენტი K1", width: 8 },
        { text: "ჯამი WAT", width: 12 },
        {
          title: "განათება",
          subs: [
            { text: "ერთეული w/m2", width: 8 },
            { text: "მთლიანი ფართი m2", width: 8 },
            { text: "ჯამი", width: 12 },
          ],
        },
      ],
    },
    // { text: "შემოსული სითბო W", fontColor: "FF0000FF" },
    { text: "სითბოს მოდინება WAT" },
    { text: "საბოლოო თბოდანაკარგი kvt", fontColor: "FFFF0000" },
    { text: "საბოლოო სითბოს მოდინება kvt", fontColor: "FF0000FF" },
  ];

  const {
    headerTitles,
    groups: headerGroups,
    superGroups,
    widths,
  } = flattenHeader(headerConfig);

  buildGroupedHeader(sheet, headerTitles, headerGroups, superGroups, [
    { title: "თბოდანარკარგის ანგარიში", start: 1, end: 11 },
    {
      title: "სითბოს მოდინების ანგარიში",
      start: 12,
      end: 33,
    },
  ]);
  // rowIndex++;
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
  const addFullWidthRow = (
    text,
    { bgColor = "FFFFFFFF", size = 12, key, fontColor = "FFFF0000", border }
  ) => {
    const row = sheet.addRow([text]);
    const r = row.number;
    sheet.mergeCells(`A${r}:${lastColLetter}${r}`);

    const cell = sheet.getCell(`A${r}`);
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.font = {
      bold: key !== "room",
      color: { argb: fontColor },
      size,
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: bgColor },
    };
    cell.border = {
      top: { style: border },
      left: { style: border },
      bottom: { style: border },
      right: { style: border },
    };
  };
  // Iterate Floors
  hvacItems.forEach((floor) => {
    addFullWidthRow(floor.floorName, {
      key: "floor",
      bgColor: "FFFCD5CE",
      size: 18,
      border: "medium",
    });
    // Iterate Apartments
    floor.apartments.forEach((flat) => {
      // ბინა
      addFullWidthRow(flat.name, {
        key: "flat",
        size: 15,
        border: "medium",
      });
      //room
      flat.rooms.forEach((room) => {
        addFullWidthRow(room.name, {
          key: "room",
          size: 15,
          border: "thin",
        });
        const sumS = room.structures.reduce((sum, s) => sum + s.s27, 0) / 1000;
        const sumG = room.structures.reduce((sum, s) => sum + s.ag27, 0) / 1000;

        room.structures.forEach((s) => {
          const structureTitles = [
            { text: s.type },
            { text: s.L27 },
            { text: s.k27 },
            { text: s.M27 },
            { text: s.length, fontColor: "0096FF" },
            { text: s.height, fontColor: "FA5F55" },
            { text: s.quantity },
            { text: s.i27 },
            { text: s.j27 },
            { text: s.q27 },
            { text: s.r27 },
            { text: s.s27 },
            { text: s.s27, fontColor: "FF0000" },
            { text: s.N27 },
            { text: s.O27 },
            { text: s.P27 },
            { text: s.t27, fontColor: "0000FF" },
            s.x27 === 0 ? null : { text: s.sunnyLabel },
            { text: s.i27 },
            s.x27 === 0 ? null : { text: s.v27 },
            s.x27 === 0 ? null : { text: s.w27 },
            s.x27 === 0 ? null : { text: s.x27, fontColor: "0000FF" },
            s.x27 === 0 ? null : { text: s.y27 },
            s.x27 === 0 ? null : { text: s.z27 },
            s.x27 === 0 ? null : { text: s.aa27 },
            s.x27 === 0 ? null : { text: s.ab27 },
            s.x27 === 0 ? null : { text: s.ac27, fontColor: "0000FF" },
            s.x27 === 0 ? null : { text: s.ad27 },
            s.x27 === 0 ? null : { text: s.Mm27 },
            s.x27 === 0 ? null : { text: s.af27, fontColor: "0000FF" },
            { text: s.ag27 },
            { text: sumS.toFixed(2), fontColor: "FF0000" },
            { text: sumG.toFixed(2), fontColor: "0000FF" },
          ];
          // if (structureTitles.length !== headerTitles.length) {
          //   console.warn(
          //     `სვეტები არ ემთხვევა: data=${structureTitles.length}, header=${headerTitles.length}`
          //   );
          // }
          const newRow = sheet.addRow(
            structureTitles.map((h) => h?.text ?? null)
          );

          newRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const style = structureTitles[colNumber - 1];
            const toArgb = (c) =>
              !c ? "FF000000" : c.length === 6 ? "FF" + c : c;

            cell.alignment = { vertical: "middle", horizontal: "center" };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
            cell.font = {
              size: 12,
              color: { argb: toArgb(style?.fontColor) },
            };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: style?.bgColor || "FFFFFFFF" },
            };
          });
        });
      });
    });
  });
  widths.forEach((w, i) => {
    sheet.getColumn(i + 1).width = w;
  });

  applyOuterBorder(sheet, headerTitles.length);
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "HVAC_Styled.xlsx");
};
