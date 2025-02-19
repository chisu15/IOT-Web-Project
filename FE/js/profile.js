function downloadPDF() {
	const pdfUrl = "./assets/documents/user-guide.pdf";

	const link = document.createElement("a");
	link.href = pdfUrl;
	link.download = "user-guide.pdf";
	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
}
