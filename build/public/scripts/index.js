var Index = /** @class */ (function () {
    function Index() {
        var _this = this;
        this.fileURL = '';
        this.form = document.querySelector('#select-file');
        this.attachBtn = document.querySelector('#chat-input-file');
        this.fileForm = document.querySelector('#send-file-form');
        this.fileDownload = document.querySelector('.file-download');
        this.converting = document.querySelector('.converting');
        this.init = function () {
            _this.onAddSendFileMessage();
            _this.onAttchBtnClick();
            _this.onDownloadFileClick();
        };
        this.onAddSendFileMessage = function () { _this.fileForm && _this.fileForm.addEventListener('submit', _this.onSendFileSubmitCallBack); };
        this.onRemoveSendFileMessage = function () { _this.fileForm.removeEventListener('submit', _this.onSendFileSubmitCallBack); };
        this.onSendFileSubmitCallBack = function (e) {
            e.preventDefault();
            if (_this.attachBtn && _this.attachBtn.files.length > 0 && _this.attachBtn.files[0]) {
                var file = _this.attachBtn.files[0];
                var fd = new FormData();
                fd.append('excelFileURL', file);
                document.querySelector('.sendfile-btn-close').click();
                _this.converting.classList.remove('invisible');
                _this.converting.classList.add('visible');
                _this.sendFileToConvert(fd);
            }
        };
        this.onAttchBtnClick = function () {
            _this.attachBtn.addEventListener('change', function (e) {
                var file = e.target.files[0];
                if (file) {
                    var addModalBtn = document.createElement('button');
                    if (file.size > 5242880) {
                        addModalBtn.setAttribute('data-bs-target', '#filetolarge');
                    }
                    else if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                        addModalBtn.setAttribute('data-bs-target', '#wrongFileType');
                    }
                    else {
                        addModalBtn.setAttribute('data-bs-target', '#sendfile');
                    }
                    addModalBtn.setAttribute('type', 'button');
                    addModalBtn.setAttribute('data-bs-toggle', 'modal');
                    document.body.appendChild(addModalBtn);
                    document.querySelectorAll('.file-name')[0].innerHTML = file && file.name;
                    document.querySelectorAll('.file-name')[1].innerHTML = file && file.name;
                    document.querySelectorAll('.file-name')[2].innerHTML = file && file.name;
                    document.querySelectorAll('.file-size')[0].innerHTML = file && _this.formatBytes(file.size);
                    document.querySelectorAll('.file-size')[1].innerHTML = file && _this.formatBytes(file.size);
                    document.querySelectorAll('.file-size')[2].innerHTML = file && _this.formatBytes(file.size);
                    addModalBtn.click();
                    document.body.removeChild(addModalBtn);
                }
            });
        };
        this.onDownloadFileClick = function () {
            _this.fileDownload.addEventListener('click', function () {
                _this.getFIle(_this.updateFileURL(_this.fileURL), new Date().toISOString().replace(/:/g, '-') + "-pods.xlsx");
            });
        };
        this.toggleFileDownloadBtn = function (toggle) {
            if (toggle === 'show') {
                _this.fileDownload.classList.remove('invisible');
                _this.fileDownload.classList.add('visible');
            }
            else if (toggle === 'hide') {
                _this.fileDownload.classList.remove('visible');
                _this.fileDownload.classList.add('invisible');
            }
        };
        this.toggleConvertingLoader = function (toggle) {
            if (toggle === 'show') {
                _this.converting.classList.remove('invisible');
                _this.converting.classList.add('visible');
            }
            else if (toggle === 'hide') {
                _this.converting.classList.remove('visible');
                _this.converting.classList.add('invisible');
            }
        };
        this.showWrongFormatModal = function () {
            var addModalBtn = document.createElement('button');
            addModalBtn.setAttribute('data-bs-target', '#wrongFormat');
            addModalBtn.setAttribute('type', 'button');
            addModalBtn.setAttribute('data-bs-toggle', 'modal');
            document.body.appendChild(addModalBtn);
            addModalBtn.click();
            document.body.removeChild(addModalBtn);
        };
        this.sendFileToConvert = function (data) {
            $.post({
                url: '/api/file',
                data: data,
                processData: false,
                contentType: false
            }).done(function (response) {
                if (response.data.success) {
                    _this.fileURL = response.data.url;
                    _this.toggleFileDownloadBtn('show');
                    _this.toggleConvertingLoader('hide');
                }
                else {
                    _this.toggleFileDownloadBtn('hide');
                    _this.toggleConvertingLoader('hide');
                    document.querySelector('.wrong-format-msg').innerHTML = (response.data.msg) ? response.data.msg : 'Sorry somethignwent wrong, contact the developer';
                    _this.showWrongFormatModal();
                }
            }).fail(function (err) {
                if (err.responseJSON.statusCode === 400 && !err.responseJSON.data.success) {
                    _this.toggleFileDownloadBtn('hide');
                    _this.toggleConvertingLoader('hide');
                    document.querySelector('.wrong-format-msg').innerHTML = (err.responseJSON.data.msg) ? err.responseJSON.data.msg : 'Sorry somethignwent wrong, contact the developer';
                    _this.showWrongFormatModal();
                }
                console.log(err);
            });
        };
        this.formatBytes = function (bytes, decimals) {
            if (decimals === void 0) { decimals = 2; }
            if (bytes === 0)
                return '0 Bytes';
            var k = 1024;
            var dm = decimals < 0 ? 0 : decimals;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };
        this.getFIle = function (url, filename) {
            $.ajax({
                url: url,
                xhrFields: {
                    responseType: 'blob'
                },
                success: function (response) {
                    //@ts-ignore
                    fileDownload(response, filename);
                },
                error: function () { }
            });
        };
    }
    Index.prototype.updateFileURL = function (fileURL) {
        if (window.location.origin === 'http://localhost:8080' || window.location.origin === 'http://192.168.43.240:8080') {
            return 'api/' + fileURL;
        }
        return fileURL;
    };
    return Index;
}());
var index = new Index();
index.init();
//# sourceMappingURL=index.js.map