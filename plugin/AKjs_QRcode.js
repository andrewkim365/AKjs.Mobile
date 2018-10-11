/*
Modification Date: 2018-10-10
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_QRcode-------------------------------------------*/
(function($) {
    $.fn.AKjs_QRcode = function(options) {
        var QRMode;
        function QR8bitByte(data) {
            this.mode = QRMode;
            this.data = data
        }
        function QRCode(typeNumber, errorCorrectLevel) {
            this.typeNumber = typeNumber;
            this.errorCorrectLevel = errorCorrectLevel;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = []
        }
        function QRPolynomial(num, shift) {
            if (void 0 == num.length) throw Error(num.length + "/" + shift);
            for (var offset = 0; offset < num.length && 0 == num[offset];) offset++;
            this.num = Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset]
        }
        function QRRSBlock(totalCount, dataCount) {
            this.totalCount = totalCount;
            this.dataCount  = dataCount;
        }
        function QRBitBuffer() {
            this.buffer = [];
            this.length = 0
        }
        QR8bitByte.prototype = {
            getLength: function() {
                return this.data.length
            },
            write: function(buffer) {
                for (var i = 0; i < this.data.length; i++) buffer.put(this.data.charCodeAt(i), 8)
            }
        };
        QRCode.prototype = {
            addData: function(data) {
                this.dataList.push(new QR8bitByte(data));
                this.dataCache = null
            },
            isDark: function(row, col) {
                if (0 > row || this.moduleCount <= row || 0 > col || this.moduleCount <= col) throw Error(row + "," + col);
                return this.modules[row][col]
            },
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                if (1 > this.typeNumber) {
                    for (var typeNumber = 1,
                             typeNumber = 1; 40 > typeNumber; typeNumber++) {
                        for (var data = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel), buffer = new QRBitBuffer, totalDataCount = 0, rsBlocks = 0; rsBlocks < data.length; rsBlocks++) totalDataCount += data[rsBlocks].dataCount;
                        for (i = 0; i < this.dataList.length; i++) data = this.dataList[i],
                            buffer.put(data.mode, 4),
                            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber)),
                            data.write(buffer);
                        if (buffer.getLengthInBits() <= 8 * totalDataCount) break
                    }
                    this.typeNumber = typeNumber
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function(test, maskPattern) {
                this.moduleCount = 4 * this.typeNumber + 17;
                this.modules = Array(this.moduleCount);
                for (var row = 0; row < this.moduleCount; row++) {
                    this.modules[row] = Array(this.moduleCount);
                    for (var col = 0; col < this.moduleCount; col++) this.modules[row][col] = null
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount - 7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(test, maskPattern);
                7 <= this.typeNumber && this.setupTypeNumber(test);
                null == this.dataCache && (this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
                this.mapData(this.dataCache, maskPattern)
            },
            setupPositionProbePattern: function(row, col) {
                for (var r = -1; 7 >= r; r++) if (! ( - 1 >= row + r || this.moduleCount <= row + r)) for (var b = -1; 7 >= b; b++) - 1 >= col + b || this.moduleCount <= col + b || (this.modules[row + r][col + b] = 0 <= r && 6 >= r && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == r || 6 == r) || 2 <= r && 4 >= r && 2 <= b && 4 >= b ? !0 : !1)
            },
            getBestMaskPattern: function() {
                for (var minLostPoint = 0,
                         pattern = 0,
                         i = 0; 8 > i; i++) {
                    this.makeImpl(!0, i);
                    var lostPoint = QRUtil.getLostPoint(this);
                    if (0 == i || minLostPoint > lostPoint) minLostPoint = lostPoint,
                        pattern = i
                }
                return pattern
            },
            createMovieClip: function(target_mc, instance_name, depth) {
                var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
                var cs = 1;
                this.make();
                for (var row = 0; row < this.modules.length; row++)
                    for (
                        var y = cs * row,
                             col = 0; col < this.modules[row].length; col++) {
                    var x = cs * col;
                    this.modules[row][col] && (qr_mc.beginFill(0, 100), qr_mc.moveTo(x, y), qr_mc.lineTo(x + cs, y), qr_mc.lineTo(x + cs, y + cs), qr_mc.lineTo(x, y + cs), qr_mc.endFill())
                }
                return qr_mc
            },
            setupTimingPattern: function() {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
            },
            setupPositionAdjustPattern: function() {
                for (var pos = QRUtil.getPatternPosition(this.typeNumber), c = 0; c < pos.length; c++) for (var d = 0; d < pos.length; d++) {
                    var row = pos[c],
                        col = pos[d];
                    if (null == this.modules[row][col]) for (var f = -2; 2 >= f; f++) for (var i = -2; 2 >= i; i++) this.modules[row + f][col + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
                }
            },
            setupTypeNumber: function(test) {
                for (var bits = QRUtil.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
                    var mod = !test && 1 == (bits >> d & 1);
                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = mod
                }
                for (d = 0; 18 > d; d++) mod = !test && 1 == (bits >> d & 1),
                    this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = mod
            },
            setupTypeInfo: function(test, maskPattern) {
                for (var data = QRUtil.getBCHTypeInfo(this.errorCorrectLevel << 3 | maskPattern), i = 0; 15 > i; i++) {
                    var mod = !test && 1 == (data >> i & 1);
                    6 > i ? this.modules[i][8] = mod: 8 > i ? this.modules[i + 1][8] = mod: this.modules[this.moduleCount - 15 + i][8] = mod
                }
                for (i = 0; 15 > i; i++) mod = !test && 1 == (data >> i & 1),
                    8 > i ? this.modules[8][this.moduleCount - i - 1] = mod: 9 > i ? this.modules[8][15 - i - 1 + 1] = mod: this.modules[8][15 - i - 1] = mod;
                this.modules[this.moduleCount - 8][8] = !test
            },
            mapData: function(data, maskPattern) {
                for (var inc = -1,
                         row = this.moduleCount - 1,
                         bitIndex = 7,
                         byteIndex = 0,
                         col = this.moduleCount - 1; 0 < col; col -= 2) for (6 == col && col--;;) {
                    for (var g = 0; 2 > g; g++) if (null == this.modules[row][col - g]) {
                        var dark = !1;
                        byteIndex < data.length && (dark = 1 == (data[byteIndex] >>> bitIndex & 1));
                        QRUtil.getMask(maskPattern, row, col - g) && (dark = !dark);
                        this.modules[row][col - g] = dark;
                        bitIndex--; - 1 == bitIndex && (byteIndex++, bitIndex = 7)
                    }
                    row += inc;
                    if (0 > row || this.moduleCount <= row) {
                        row -= inc;
                        inc = -inc;
                        break
                    }
                }
            }
        };
        QRCode.PAD0 = 236;
        QRCode.PAD1 = 17;
        QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
            for (var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel), buffer = new QRBitBuffer, e = 0; e < dataList.length; e++) {
                var data = dataList[e];
                buffer.put(data.mode, 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
                data.write(buffer)
            }
            for (e = typeNumber = 0; e < rsBlocks.length; e++) typeNumber += rsBlocks[e].dataCount;
            if (buffer.getLengthInBits() > 8 * typeNumber) throw Error("code length overflow. (" + buffer.getLengthInBits() + ">" + 8 * typeNumber + ")");
            for (buffer.getLengthInBits() + 4 <= 8 * typeNumber && buffer.put(0, 4); 0 != buffer.getLengthInBits() % 8;) buffer.putBit(!1);
            for (; ! (buffer.getLengthInBits() >= 8 * typeNumber);) {
                buffer.put(QRCode.PAD0, 8);
                if (buffer.getLengthInBits() >= 8 * typeNumber) break;
                buffer.put(QRCode.PAD1, 8)
            }
            return QRCode.createBytes(buffer, rsBlocks)
        };
        QRCode.createBytes = function(buffer, rsBlocks) {
            for (var offset = 0,
                     maxDcCount = 0,
                     maxEcCount = 0,
                     dcdata = Array(rsBlocks.length),
                     ecdata = Array(rsBlocks.length),
                     g = 0; g < rsBlocks.length; g++) {
                var dcCount = rsBlocks[g].dataCount,
                    ecCount = rsBlocks[g].totalCount - dcCount,
                    maxDcCount = Math.max(maxDcCount, dcCount),
                    maxEcCount = Math.max(maxEcCount, ecCount);
                dcdata[g] = Array(dcCount);
                for (var rsPoly = 0; rsPoly < dcdata[g].length; rsPoly++) dcdata[g][rsPoly] = 255 & buffer.buffer[rsPoly + offset];
                offset += dcCount;
                rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                dcCount = (new QRPolynomial(dcdata[g], rsPoly.getLength() - 1)).mod(rsPoly);
                ecdata[g] = Array(rsPoly.getLength() - 1);
                for (rsPoly = 0; rsPoly < ecdata[g].length; rsPoly++) ecCount = rsPoly + dcCount.getLength() - ecdata[g].length,
                    ecdata[g][rsPoly] = 0 <= ecCount ? dcCount.get(ecCount) : 0
            }
            for (rsPoly = g = 0; rsPoly < rsBlocks.length; rsPoly++) g += rsBlocks[rsPoly].totalCount;
            offset = Array(g);
            for (rsPoly = dcCount = 0; rsPoly < maxDcCount; rsPoly++) for (g = 0; g < rsBlocks.length; g++) rsPoly < dcdata[g].length && (offset[dcCount++] = dcdata[g][rsPoly]);
            for (rsPoly = 0; rsPoly < maxEcCount; rsPoly++) for (g = 0; g < rsBlocks.length; g++) rsPoly < ecdata[g].length && (offset[dcCount++] = ecdata[g][rsPoly]);
            return offset
        };
        QRMode = 4;
        for (var QRUtil = {
                PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function(data) {
                    for (var c = data << 10; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);) c ^= QRUtil.G15 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);
                    return (data << 10 | c) ^ QRUtil.G15_MASK
                },
                getBCHTypeNumber: function(data) {
                    for (var c = data << 12; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);) c ^= QRUtil.G18 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);
                    return data << 12 | c
                },
                getBCHDigit: function(data) {
                    for (var digit = 0; 0 != data;) digit++,
                        data >>>= 1;
                    return digit
                },
                getPatternPosition: function(typeNumber) {
                    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]
                },
                getMask: function(maskPattern, c, d) {
                    switch (maskPattern) {
                        case 0:
                            return 0 == (c + d) % 2;
                        case 1:
                            return 0 == c % 2;
                        case 2:
                            return 0 == d % 3;
                        case 3:
                            return 0 == (c + d) % 3;
                        case 4:
                            return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                        case 5:
                            return 0 == c * d % 2 + c * d % 3;
                        case 6:
                            return 0 == (c * d % 2 + c * d % 3) % 2;
                        case 7:
                            return 0 == (c * d % 3 + (c + d) % 2) % 2;
                        default:
                            throw Error("bad maskPattern:" + maskPattern);
                    }
                },
                getErrorCorrectPolynomial: function(errorCorrectLength) {
                    for (var c = new QRPolynomial([1], 0), d = 0; d < errorCorrectLength; d++) c = c.multiply(new QRPolynomial([1, QRMath.gexp(d)], 0));
                    return c
                },
                getLengthInBits: function(mode, type) {
                    if (1 <= type && 10 > type) switch (mode) {
                        case 1:
                            return 10;
                        case 2:
                            return 9;
                        case 4:
                            return 8;
                        case 8:
                            return 8;
                        default:
                            throw Error("mode:" + mode);
                    } else if (27 > type) switch (mode) {
                        case 1:
                            return 12;
                        case 2:
                            return 11;
                        case 4:
                            return 16;
                        case 8:
                            return 10;
                        default:
                            throw Error("mode:" + mode);
                    } else if (41 > type) switch (mode) {
                        case 1:
                            return 14;
                        case 2:
                            return 13;
                        case 4:
                            return 16;
                        case 8:
                            return 12;
                        default:
                            throw Error("mode:" + mode);
                    } else throw Error("type:" + type);
                },
                getLostPoint: function(qrCode) {
                    for (var moduleCount = qrCode.getModuleCount(), d = 0, b = 0; b < moduleCount; b++) for (var e = 0; e < moduleCount; e++) {
                        for (var f = 0,
                                 i = qrCode.isDark(b, e), g = -1; 1 >= g; g++) if (! (0 > b + g || moduleCount <= b + g)) for (var h = -1; 1 >= h; h++) 0 > e + h || moduleCount <= e + h || 0 == g && 0 == h || i == qrCode.isDark(b + g, e + h) && f++;
                        5 < f && (d += 3 + f - 5)
                    }
                    for (b = 0; b < moduleCount - 1; b++) for (e = 0; e < moduleCount - 1; e++) if (f = 0, qrCode.isDark(b, e) && f++, qrCode.isDark(b + 1, e) && f++, qrCode.isDark(b, e + 1) && f++, qrCode.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) d += 3;
                    for (b = 0; b < moduleCount; b++) for (e = 0; e < moduleCount - 6; e++) qrCode.isDark(b, e) && !qrCode.isDark(b, e + 1) && qrCode.isDark(b, e + 2) && qrCode.isDark(b, e + 3) && qrCode.isDark(b, e + 4) && !qrCode.isDark(b, e + 5) && qrCode.isDark(b, e + 6) && (d += 40);
                    for (e = 0; e < moduleCount; e++) for (b = 0; b < moduleCount - 6; b++) qrCode.isDark(b, e) && !qrCode.isDark(b + 1, e) && qrCode.isDark(b + 2, e) && qrCode.isDark(b + 3, e) && qrCode.isDark(b + 4, e) && !qrCode.isDark(b + 5, e) && qrCode.isDark(b + 6, e) && (d += 40);
                    for (e = f = 0; e < moduleCount; e++) for (b = 0; b < moduleCount; b++) qrCode.isDark(b, e) && f++;
                    qrCode = Math.abs(100 * f / moduleCount / moduleCount - 50) / 5;
                    return d + 10 * qrCode
                }
            },
                 QRMath = {
                     glog: function(n) {
                         if (1 > n) throw Error("glog(" + n + ")");
                         return QRMath.LOG_TABLE[n]
                     },
                     gexp: function(n) {
                         for (; 0 > n;) n += 255;
                         for (; 256 <= n;) n -= 255;
                         return QRMath.EXP_TABLE[n]
                     },
                     EXP_TABLE: Array(256),
                     LOG_TABLE: Array(256)
                 },
                 m = 0; 8 > m; m++) QRMath.EXP_TABLE[m] = 1 << m;
        for (m = 8; 256 > m; m++) QRMath.EXP_TABLE[m] = QRMath.EXP_TABLE[m - 4] ^ QRMath.EXP_TABLE[m - 5] ^ QRMath.EXP_TABLE[m - 6] ^ QRMath.EXP_TABLE[m - 8];
        for (m = 0; 255 > m; m++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[m]] = m;
        QRPolynomial.prototype = {
            get: function(index) {
                return this.num[index]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(a) {
                for (var num = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++) for (var b = 0; b < a.getLength(); b++) num[d + b] ^= QRMath.gexp(QRMath.glog(this.get(d)) + QRMath.glog(a.get(b)));
                return new QRPolynomial(num, 0)
            },
            mod: function(a) {
                if (0 > this.getLength() - a.getLength()) return this;
                for (var c = QRMath.glog(this.get(0)) - QRMath.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++) d[b] = this.get(b);
                for (b = 0; b < a.getLength(); b++) d[b] ^= QRMath.gexp(QRMath.glog(a.get(b)) + c);
                return (new QRPolynomial(d, 0)).mod(a)
            }
        };
        QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
            var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
            if (void 0 == rsBlock) throw Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
            for (var length = rsBlock.length / 3,
                     list = [], f = 0; f < length; f++) for (var h = rsBlock[3 * f + 0], g = rsBlock[3 * f + 1], QRUtil = rsBlock[3 * f + 2], QRMath = 0; QRMath < h; QRMath++) list.push(new QRRSBlock(g, QRUtil));
            return list
        };
        QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
            switch (errorCorrectLevel) {
                case 1:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 0];
                case 0:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 1];
                case 3:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 2];
                case 2:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 3]
            }
        };
        QRBitBuffer.prototype = {
            get: function(index) {
                return 1 == (this.buffer[Math.floor(index / 8)] >>> 7 - index % 8 & 1)
            },
            put: function(num, length) {
                for (var d = 0; d < length; d++) this.putBit(1 == (num >>> length - d - 1 & 1))
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(bit) {
                var bufIndex = Math.floor(this.length / 8);
                this.buffer.length <= bufIndex && this.buffer.push(0);
                bit && (this.buffer[bufIndex] |= 128 >>> this.length % 8);
                this.length++
            }
        };
        "string" === typeof options && (options = {
            text: options
        });
        options = $.extend({},
            {
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: "#ffffff",
                foreground: "#000000"
            },
            options);
        return this.each(function() {
            var element;
            element = new QRCode(options.typeNumber, options.correctLevel);
            element.addData(options.text);
            element.make();
            var createCanvas = document.createElement("canvas");
            var img_url = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5MzhGOTQyNTVCNTExRThCRDUxQ0NDNUUwRkQzODNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5MzhGOTQzNTVCNTExRThCRDUxQ0NDNUUwRkQzODNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDkzOEY5NDA1NUI1MTFFOEJENTFDQ0M1RTBGRDM4M0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDkzOEY5NDE1NUI1MTFFOEJENTFDQ0M1RTBGRDM4M0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAAQABAAACAkQBADs=";
            createCanvas.width = options.width;
            createCanvas.height = options.height;
            for (var ctx = createCanvas.getContext("2d"), tileW = options.width / element.getModuleCount(), tileH = options.height / element.getModuleCount(), row = 0; row < element.getModuleCount(); row++) for (var i = 0; i < element.getModuleCount(); i++) {
                ctx.fillStyle = element.isDark(row, i) ? options.foreground: options.background;
                var g = Math.ceil((i + 1) * tileW) - Math.floor(i * tileW),
                    QRUtil = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                ctx.fillRect(Math.round(i * tileW), Math.round(row * tileH), g, QRUtil)
            }
            element = createCanvas;
            $(element).appendTo(this);
            AKjs_UserAgent();
            if (IsMobile) {
                $(this).addClass("rel ovh");
                $("<img src='"+img_url+"' class='dis_block left_0 top_0 zindex_2 abs wh_100' />").appendTo(this);
            }
            var resize = this;
            $(window).resize(function(){
                if (IsMobile == null) {
                    $(resize).removeClass("rel ovh");
                    $(resize).find("img").remove();
                } else {
                    $(resize).addClass("rel ovh");
                    if ($(resize).find("img").length < 1) {
                        $("<img src='"+img_url+"' class='dis_block left_0 top_0 zindex_2 abs wh_100' />").appendTo(resize);
                    }
                }
            });
        })
    }
}(jQuery));

