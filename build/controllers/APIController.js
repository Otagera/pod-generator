"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exceljs_1 = __importDefault(require("exceljs"));
var index_1 = require("./decorators/index");
var middlewares_1 = require("../middlewares");
var testm = function (req, res, next) {
    console.log('testm');
    next();
};
var testt = function (req, res, next) {
    console.log('testt', req.body);
    next();
};
var APIController = /** @class */ (function () {
    function APIController() {
    }
    APIController.prototype.sendFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var file, fileURL, output_1, workbook, products_1, facilities_1, lga_1, facility_1, k_1, lgas_1, addedLgas_1, lgasMap_1, facilityMap_1, startDatanext_1, worksheet, data_1, data_2, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = req.file;
                        fileURL = (file) ? file.path : '';
                        console.log(fileURL);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        output_1 = new exceljs_1.default.Workbook();
                        output_1.creator = 'Me';
                        output_1.lastModifiedBy = 'Me';
                        output_1.modified = new Date();
                        output_1.created = new Date();
                        return [4 /*yield*/, new exceljs_1.default.Workbook().xlsx.readFile(fileURL)];
                    case 2:
                        workbook = _a.sent();
                        products_1 = [];
                        facilities_1 = [];
                        lga_1 = '', facility_1 = '', k_1 = 1;
                        lgas_1 = [
                            'birnin gwari', 'chikun', 'giwa', 'igabi', 'ikara', 'jaba',
                            'jema a', 'kachia', 'kaduna north', 'kaduna south', 'kagarko',
                            'kajuru', 'kaura', 'kauru', 'kubau', 'kudan', 'lere', 'makarfi',
                            'sabon gari', 'sanga', 'soba', 'zangon kataf', 'zaria'
                        ];
                        lgas_1.map(function (lga) { output_1.addWorksheet(lga); });
                        addedLgas_1 = [];
                        lgasMap_1 = new Map();
                        facilityMap_1 = new Map();
                        startDatanext_1 = false;
                        worksheet = workbook.getWorksheet('LMD ACTUAL AND FOR POD');
                        if (!worksheet) {
                            data_1 = { success: false, msg: "Please check the sheet name in the file you sent, it should be 'LMD ACTUAL AND FOR POD' no space before or after" };
                            return [2 /*return*/, res.statusJson(400, { data: data_1 })];
                        }
                        worksheet.eachRow(function (row) {
                            var i = 0, j = 0;
                            var localProducts = [];
                            row.eachCell(function (cell, colnumber) {
                                var table;
                                if (row.getCell('A').toString().toLowerCase() === ' facility profile' && colnumber > 5 && row.getCell('F').toString().toLowerCase() === 'female condom') {
                                    products_1.push({ product: cell.value, unit: '', qty: 0 });
                                }
                                else if (row.getCell('A').toString().toLowerCase() === ' facility profile' && colnumber > 5 && products_1.length > 0) {
                                    products_1[i].unit = cell.value;
                                    i++;
                                }
                                if (row.getCell('S').toString().toLowerCase() === 'quantity supplied') {
                                    startDatanext_1 = true;
                                }
                                if (startDatanext_1) {
                                    var notFive = ['total', 'facility profile', 'sitename'];
                                    if (row.getCell('D').toString().toLowerCase() !== 'total') {
                                        lga_1 = row.getCell('E').toString().toLowerCase();
                                    }
                                    localProducts = products_1.map(function (prod) {
                                        return __assign({}, prod);
                                    });
                                    if (colnumber === 4 && lgas_1.includes(lga_1) && !addedLgas_1.includes(lga_1)) {
                                        if (!notFive.includes(cell.value.toString().toLowerCase())) {
                                            facility_1 = cell.value.toString().slice(0, 31);
                                            var sheet = output_1.getWorksheet(lga_1);
                                            table = sheet && sheet.addTable({
                                                name: facility_1,
                                                displayName: facility_1,
                                                ref: "A" + (k_1 + 6),
                                                columns: [
                                                    { name: 'S/N' },
                                                    { name: 'PRODUCTS' },
                                                    { name: 'UNITS' },
                                                    { name: 'QTY ISSUED' },
                                                    { name: 'QTY RECEIVED' },
                                                    { name: 'REMARKS' },
                                                ],
                                                rows: [],
                                                style: {
                                                    theme: 'TableStyleLight15'
                                                }
                                            });
                                            k_1 = k_1 + products_1.length + 20;
                                        }
                                        if (cell.value.toString().toLowerCase() === 'total') {
                                            var localMap = new Map(facilityMap_1);
                                            facilityMap_1.clear();
                                            facilities_1.push(localMap);
                                            var localFacilities = facilities_1.map(function (facility) { return facility; });
                                            lgasMap_1.set(lga_1, __spread(localFacilities));
                                            facilities_1.splice(0);
                                            addedLgas_1.push(lga_1);
                                            startDatanext_1 = false;
                                            k_1 = 1;
                                            j = 0;
                                            i = 0;
                                            products_1.splice(0);
                                        }
                                    }
                                    if (colnumber > 5 && facility_1) {
                                        if (facilityMap_1.get(facility_1)) {
                                            localProducts = facilityMap_1.get(facility_1);
                                        }
                                        //@ts-ignore
                                        localProducts[j].qty = (cell.value.result) ? Number.parseInt(cell.value.result) : Number.parseInt(cell.value);
                                        j++;
                                        facilityMap_1.set(facility_1, __spread(localProducts));
                                    }
                                }
                            });
                        });
                        output_1.eachSheet(function (sheet) {
                            var facilities = lgasMap_1.get(sheet.name);
                            facilities && facilities.forEach(function (value) {
                                var facilityNo = 1;
                                value.forEach(function (products, key) {
                                    var table = sheet.getTable(key);
                                    if (table) {
                                        var ref = table.ref;
                                        var columnNo = ref.substring(0, 1);
                                        var rowNo = ref.substring(1);
                                        sheet.getColumn('B').width = 21;
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) - 6)).value = 'PROOF OF DELIVERY FOR FAMILY PLANNING COMMODITIES';
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) - 6)).font = { bold: true };
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) - 6)).alignment = { vertical: 'middle', horizontal: 'center' };
                                        sheet.mergeCells("" + columnNo + (Number.parseInt(rowNo) - 6) + ":" + 'F' + (Number.parseInt(rowNo) - 6));
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) - 4)).value = 'Date:';
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) - 4)).font = { bold: true };
                                        sheet.getCell("" + 'B' + (Number.parseInt(rowNo) - 4)).value = new Date();
                                        sheet.getCell("" + 'B' + (Number.parseInt(rowNo) - 4)).font = { bold: true };
                                        sheet.getCell("" + 'C' + (Number.parseInt(rowNo) - 4)).value = 'POD No.:';
                                        sheet.getCell("" + 'C' + (Number.parseInt(rowNo) - 4)).font = { bold: true };
                                        sheet.getCell("" + 'D' + (Number.parseInt(rowNo) - 4)).value = facilityNo++;
                                        sheet.getCell("" + 'D' + (Number.parseInt(rowNo) - 4)).font = { bold: true };
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) - 2)).value = 'LGA:';
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) - 2)).font = { bold: true };
                                        sheet.getCell("" + 'B' + (Number.parseInt(rowNo) - 2)).value = sheet.name;
                                        sheet.getCell("" + 'B' + (Number.parseInt(rowNo) - 2)).font = { bold: true };
                                        sheet.getCell("" + 'C' + (Number.parseInt(rowNo) - 2)).value = 'Facility Name:';
                                        sheet.getCell("" + 'C' + (Number.parseInt(rowNo) - 2)).font = { bold: true };
                                        sheet.getCell("" + 'E' + (Number.parseInt(rowNo) - 2)).value = key;
                                        sheet.getCell("" + 'E' + (Number.parseInt(rowNo) - 2)).font = { bold: true };
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) + products.length + 3)).value = 'Supplied By:..............................';
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) + products.length + 3)).font = { bold: true };
                                        sheet.getCell("" + 'D' + (Number.parseInt(rowNo) + products.length + 3)).value = 'Date:';
                                        sheet.getCell("" + 'D' + (Number.parseInt(rowNo) + products.length + 3)).font = { bold: true };
                                        sheet.getCell("" + 'E' + (Number.parseInt(rowNo) + products.length + 3)).value = '..............................';
                                        sheet.getCell("" + 'E' + (Number.parseInt(rowNo) + products.length + 3)).font = { bold: true };
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) + products.length + 5)).value = 'Recieved By:..............................';
                                        sheet.getCell("" + columnNo + (Number.parseInt(rowNo) + products.length + 5)).font = { bold: true };
                                        sheet.getCell("" + 'D' + (Number.parseInt(rowNo) + products.length + 5)).value = 'Date:';
                                        sheet.getCell("" + 'D' + (Number.parseInt(rowNo) + products.length + 5)).font = { bold: true };
                                        sheet.getCell("" + 'E' + (Number.parseInt(rowNo) + products.length + 5)).value = '..............................';
                                        sheet.getCell("" + 'E' + (Number.parseInt(rowNo) + products.length + 5)).font = { bold: true };
                                        for (var i = 0; i < products.length; i++) {
                                            table.addRow([i + 1, products[i].product, products[i].unit, products[i].qty]);
                                        }
                                        table.commit();
                                    }
                                });
                            });
                        });
                        data_2 = { success: true, url: '' };
                        output_1.xlsx.writeFile('./uploads/output.xlsx').then(function () {
                            console.log("xls file is written to output.");
                            data_2.success = true;
                            data_2.url = './uploads/output.xlsx';
                        }).catch(function (err) {
                            data_2.success = false;
                            console.log(err);
                        });
                        setTimeout(function () {
                            return res.statusJson(200, { data: data_2 });
                        }, 10000);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.statusJson(500, { err: err_1 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        index_1.post('/file'),
        index_1.use(middlewares_1.upload.single('excelFileURL')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], APIController.prototype, "sendFile", null);
    APIController = __decorate([
        index_1.controller('/api')
    ], APIController);
    return APIController;
}());
//# sourceMappingURL=APIController.js.map