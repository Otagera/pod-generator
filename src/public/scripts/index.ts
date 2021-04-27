
interface JQuery{
	tooltip(): void;
	popover(): void;
	magnificPopup(MagOptions): void;
	modal(
		setting?: string,
		options?: { [key: string]: string | undefined }
	): void;
}
class Index {
	fileURL = '';

	form: Element = document.querySelector('#select-file');
	attachBtn: HTMLInputElement = document.querySelector('#chat-input-file');
	fileForm: Element = document.querySelector('#send-file-form');
	fileDownload: Element = document.querySelector('.file-download');
	converting: Element = document.querySelector('.converting');

	init = (): void => {
		$(function(){
			$('[data-toggle="popover"]').popover()
		});
		$(".popup-img").magnificPopup({
			type:"image",
			closeOnContentClick: true,
			mainClass:"popup-img",
			image:{
				verticalFit: true
			}
		});
		this.onAddSendFileMessage();
		this.onAttchBtnClick();
		this.onDownloadFileClick();
	}

	onAddSendFileMessage = (): void =>{ this.fileForm && this.fileForm.addEventListener('submit', this.onSendFileSubmitCallBack); }
	onRemoveSendFileMessage = (): void=>{ this.fileForm.removeEventListener('submit', this.onSendFileSubmitCallBack); }
	onSendFileSubmitCallBack = (e: Event)=>{
		e.preventDefault();
		if(this.attachBtn && this.attachBtn.files.length > 0 && this.attachBtn.files[0]){
			const file = this.attachBtn.files[0];

			const fd = new FormData();
			fd.append('excelFileURL', file);

			(document.querySelector('.sendfile-btn-close') as HTMLButtonElement).click();
			this.converting.classList.remove('invisible');
			this.converting.classList.add('visible');
			this.sendFileToConvert(fd);
		}
	}
	onAttchBtnClick = (): void=>{
		this.attachBtn.addEventListener('change', (e)=>{
			const file = (e.target as HTMLInputElement).files[0];
			if(file){
				const addModalBtn = document.createElement('button');
				if(file.size > 5242880){
					addModalBtn.setAttribute('data-bs-target', '#filetolarge');
				}else if(file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
					addModalBtn.setAttribute('data-bs-target', '#wrongFileType');
				}else{
					addModalBtn.setAttribute('data-bs-target', '#sendfile');
				}
				addModalBtn.setAttribute('type', 'button');
				addModalBtn.setAttribute('data-bs-toggle', 'modal');
				document.body.appendChild(addModalBtn);
				document.querySelectorAll('.file-name')[0].innerHTML = file && file.name;
				document.querySelectorAll('.file-name')[1].innerHTML = file && file.name;
				document.querySelectorAll('.file-name')[2].innerHTML = file && file.name;
				document.querySelectorAll('.file-size')[0].innerHTML = file && this.formatBytes(file.size);
				document.querySelectorAll('.file-size')[1].innerHTML = file && this.formatBytes(file.size);
				document.querySelectorAll('.file-size')[2].innerHTML = file && this.formatBytes(file.size);
				addModalBtn.click();
				document.body.removeChild(addModalBtn);
			}
		});
	}
	onDownloadFileClick = (): void =>{
		this.fileDownload.addEventListener('click', ()=>{
			this.getFIle(this.updateFileURL(this.fileURL), `${new Date().toISOString().replace(/:/g, '-')}-pods.xlsx`);
		});
	}

	toggleFileDownloadBtn = (toggle: string): void=>{
		if(toggle === 'show'){
			this.fileDownload.classList.remove('invisible');
			this.fileDownload.classList.add('visible');
		}else if(toggle === 'hide'){
			this.fileDownload.classList.remove('visible');
			this.fileDownload.classList.add('invisible');
		}
	}
	toggleConvertingLoader = (toggle: string): void=>{
		if(toggle === 'show'){
			this.converting.classList.remove('invisible');
			this.converting.classList.add('visible');
		}else if(toggle === 'hide'){
			this.converting.classList.remove('visible');
			this.converting.classList.add('invisible');
		}
	}
	showWrongFormatModal = (): void=>{
		const addModalBtn = document.createElement('button');
		addModalBtn.setAttribute('data-bs-target', '#wrongFormat');
		addModalBtn.setAttribute('type', 'button');
		addModalBtn.setAttribute('data-bs-toggle', 'modal');
		document.body.appendChild(addModalBtn);
		addModalBtn.click();
		document.body.removeChild(addModalBtn);
	}

	sendFileToConvert = (data): void =>{
		$.post({
			url: '/api/file',
			data: data,
			processData: false,
			contentType: false
		}).done((response)=>{
			if(response.data.success){
				this.fileURL = response.data.url;
				this.toggleFileDownloadBtn('show');
				this.toggleConvertingLoader('hide');
			}else{
				this.toggleFileDownloadBtn('hide');
				this.toggleConvertingLoader('hide');
				document.querySelector('.wrong-format-msg').innerHTML = (response.data.msg)? response.data.msg: 'Sorry somethignwent wrong, contact the developer';
				this.showWrongFormatModal();
			}
		}).fail(err=>{
			if(err.responseJSON.statusCode === 400 && !err.responseJSON.data.success){
				this.toggleFileDownloadBtn('hide');
				this.toggleConvertingLoader('hide');
				document.querySelector('.wrong-format-msg').innerHTML = (err.responseJSON.data.msg)? err.responseJSON.data.msg: 'Sorry somethignwent wrong, contact the developer';
				this.showWrongFormatModal();
			}
			console.log(err);
		});
	}
	updateFileURL(fileURL: string){
		return 'api/' + fileURL;
	}
	formatBytes = (bytes, decimals = 2): string =>{
	    if (bytes === 0) return '0 Bytes';

	    const k = 1024;
	    const dm = decimals < 0 ? 0 : decimals;
	    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	    const i = Math.floor(Math.log(bytes) / Math.log(k));

	    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
	getFIle = (url: string, filename: string): void=>{
		$.ajax({
			url: url,
			xhrFields: {
				responseType: 'blob'
			},
			success: (response)=>{
	        	//@ts-ignore
				fileDownload(response, filename);
			},
			error: ()=>{}
		});
	}
}

const index = new Index();
index.init();