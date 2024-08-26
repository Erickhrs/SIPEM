function StartCard(element) {
        document.getElementById("container-main").style.display = "none";
        document.getElementById("container-" + element).style.display = "flex";
}

function CloseCard(element) {
        window.location.reload();
}


function getData(element) {
    var datas = new Object();
    if (element == "f1") {
        //pegando as infos
        datas.name = document.getElementById("in_produto").value
        datas.id = document.getElementById("in_id").value
        if (datas.id.length <= 16) {
            datas.link = `https://embramais.auvo.com.br/Ticket/Novo?eq=1669429&id=${datas.id}&admin=54442`
            //gerando qr code
            qrcodes = [
                new QRCode({

                    msg: datas.link
                    , dim: 200
                    , pad: 4
                    , mtx: -1
                    , ecl: "H"
                    , ecb: 1
                    , pal: ["black", "#fff"]
                    , vrb: 0

                })
            ];

            //integrando
            for (var c = 0; c < qrcodes.length; c++) {
                //document.body.appendChild( qrcodes[ c ] );
                console.log(datas)
                datas.qr = qrcodes[c]
                var product_final = datas.name;
                var QR = qrcodes[c].innerHTML
                var color = window.getComputedStyle(document.body).getPropertyValue('background-color');
                var source = "f1"
                var idc = datas.id

                Integration(QR, product_final, color, source, idc)
            }
        } else{
            alert("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE MÁXIMO 16 CARACTERES, ANALISE E TENTE NOVAMENTE!");
            console.log("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE MÁXIMO 16 CARACTERES, ANALISE E TENTE NOVAMENTE!");
        }
    }
    if (element == "f2") {
        document.getElementById("generateF2").onclick = function () { };
        document.getElementById("generateF2").innerHTML = "GERANDO..."
        var fileInput = document.getElementById('excel_file');
        var file = fileInput.files[0];
        var datas = {
            name: [],
            id: [],
            link: [],
            qr: []

        };


        if (file) {
            var reader = new FileReader();
            var qrcodes = new Object();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0]; // Pega o nome da primeira planilha
                var worksheet = workbook.Sheets[sheetName];

                // Converte o worksheet para um array de objetos
                var rows = XLSX.utils.sheet_to_json(worksheet);

                // Pega todos os dados da primeira e da terceira coluna
                var firstColumnData = rows.map(row => row[Object.keys(row)[0]]);
                var thirdColumnData = rows.map(row => row[Object.keys(row)[2]]);

                // console.log("Primeira coluna:", firstColumnData);
                //  console.log("Terceira coluna:", thirdColumnData);

                for (var c = 1; c < firstColumnData.length; c++) {
                    console.log(thirdColumnData[c]);

                    // Verificar se thirdColumnData[c] é undefined, 0 ou similar
                    if (thirdColumnData[c] === undefined || thirdColumnData[c] === 0 || thirdColumnData[c] === '0' || thirdColumnData[c] === '') {
                        // Mostrar alerta de erro e interromper o loop
                        alert("ERRO: ID NÃO PODE SER UNDEFINED, 0 OU VAZIO, ANALISE E TENTE NOVAMENTE.");
                        console.log("ERRO: ID NÃO PODE SER UNDEFINED, 0 OU VAZIO, ANALISE E TENTE NOVAMENTE.");
                        break;
                    }

                    if (thirdColumnData[c].length > 16) {
                        alert("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE MÁXIMO 16 CARACTERES, ANALISE E TENTE NOVAMENTE:" + thirdColumnData[c]);
                        console.log("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE 16 CARACTERES, ANALISE E TENTE NOVAMENTE:" + thirdColumnData[c]);
                        break;
                    } else {
                        if (firstColumnData[c].length <= 150) {
                            datas.name[c] = firstColumnData[c];
                            datas.id[c] = thirdColumnData[c];
                            datas.link[c] = `https://embramais.auvo.com.br/Ticket/Novo?eq=1669429&id=${datas.id[c]}&admin=54442`;
                            datas.qr[c] = [
                                new QRCode({
                                    msg: datas.link[c],
                                    dim: 200,
                                    pad: 4,
                                    mtx: -1,
                                    ecl: "H",
                                    ecb: 1,
                                    pal: ["black", "#fff"],
                                    vrb: 0
                                })
                            ];
                            console.log(datas);
                            var product_final = datas.name[c];
                            var QR = datas.qr[c][0].innerHTML;
                            var color = window.getComputedStyle(document.body).getPropertyValue('background-color');
                            var source = "f2";
                            var idc = datas.id[c]
                            Integration(QR, product_final, color, source, idc);
                        } else {
                            alert("ERRO: FOI IDENTIFICADO PRODUTO COM MAIS DE 150 CARACTERES, ANALISE E TENTE NOVAMENTE:" + firstColumnData[c]);
                            console.log("ERRO: FOI IDENTIFICADO PRODUTO COM MAIS DE 150 CARACTERES, ANALISE E TENTE NOVAMENTE:" + firstColumnData[c]);
                            break;
                        }
                    }
                }


                DownloadAllAsZip()

            };
            reader.onerror = function (ex) {
                console.error("Erro ao ler o arquivo", ex);
            };

            reader.readAsBinaryString(file);

        }
        document.getElementById("generateF2").style.backgroundColor = "red";
        document.getElementById("generateF2").innerHTML = "GERADO!"
    }
    if (element == "f3") {
        document.getElementById("generateF3").onclick = function () { printScreen(); };
        document.getElementById("generateF3").innerHTML = "GERANDO..."
        var fileInput = document.getElementById('excel_file3');
        var file = fileInput.files[0];
        var datas = {
            name: [],
            id: [],
            link: [],
            qr: []

        };


        if (file) {
            var reader = new FileReader();
            var qrcodes = new Object();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0]; // Pega o nome da primeira planilha
                var worksheet = workbook.Sheets[sheetName];

                // Converte o worksheet para um array de objetos
                var rows = XLSX.utils.sheet_to_json(worksheet);

                // Pega todos os dados da primeira e da terceira coluna
                var firstColumnData = rows.map(row => row[Object.keys(row)[0]]);
                var thirdColumnData = rows.map(row => row[Object.keys(row)[2]]);

                // console.log("Primeira coluna:", firstColumnData);
                //  console.log("Terceira coluna:", thirdColumnData);

                for (var c = 1; c < firstColumnData.length; c++) {
                    console.log(thirdColumnData[c]);

                    // Verificar se thirdColumnData[c] é undefined, 0 ou similar
                    if (thirdColumnData[c] === undefined || thirdColumnData[c] === 0 || thirdColumnData[c] === '0' || thirdColumnData[c] === '') {
                        // Mostrar alerta de erro e interromper o loop
                        alert("ERRO: ID NÃO PODE SER UNDEFINED, 0 OU VAZIO, ANALISE E TENTE NOVAMENTE.");
                        console.log("ERRO: ID NÃO PODE SER UNDEFINED, 0 OU VAZIO, ANALISE E TENTE NOVAMENTE.");
                        break;
                    }

                    if (thirdColumnData[c].length > 16) {
                        alert("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE MÁXIMO 16 CARACTERES, ANALISE E TENTE NOVAMENTE:" + thirdColumnData[c]);
                        console.log("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE 16 CARACTERES, ANALISE E TENTE NOVAMENTE:" + thirdColumnData[c]);
                        break;
                    } else {
                        if (firstColumnData[c].length <= 150) {
                            datas.name[c] = firstColumnData[c];
                            datas.id[c] = thirdColumnData[c];
                            datas.link[c] = `https://embramais.auvo.com.br/Ticket/Novo?eq=1669429&id=${datas.id[c]}&admin=54442`;
                            datas.qr[c] = [
                                new QRCode({
                                    msg: datas.link[c],
                                    dim: 200,
                                    pad: 4,
                                    mtx: -1,
                                    ecl: "H",
                                    ecb: 1,
                                    pal: ["black", "#fff"],
                                    vrb: 0
                                })
                            ];
                            console.log(datas);
                            var product_final = datas.name[c];
                            var QR = datas.qr[c][0].innerHTML;
                            var color = window.getComputedStyle(document.body).getPropertyValue('background-color');
                            var source = "f3";
                            var idc = datas.id[c]
                            Integration(QR, product_final, color, source, idc);
                        } else {
                            alert("ERRO: FOI IDENTIFICADO PRODUTO COM MAIS DE 150 CARACTERES, ANALISE E TENTE NOVAMENTE:" + firstColumnData[c]);
                            console.log("ERRO: FOI IDENTIFICADO PRODUTO COM MAIS DE 150 CARACTERES, ANALISE E TENTE NOVAMENTE:" + firstColumnData[c]);
                            break;
                        }
                    }
                }

            };
            reader.onerror = function (ex) {
                console.error("Erro ao ler o arquivo", ex);
            };

            reader.readAsBinaryString(file);

        }
        document.getElementById("generateF3").style.backgroundColor = "greenYellow";
        document.getElementById("generateF3").style.color = "green";
        document.getElementById("generateF3").innerHTML = "GERAR PDF"
    }
    if (element == "f4") {
        //pegando as infos
        datas.name = document.getElementById("in_produto4").value
        datas.id = document.getElementById("in_id4").value
        if (datas.id.length <= 16) {
            datas.link = `https://embramais.auvo.com.br/Ticket/Novo?eq=1669429&id=${datas.id}&admin=54442`
            //gerando qr code
            qrcodes = [
                new QRCode({

                    msg: datas.link
                    , dim: 200
                    , pad: 4
                    , mtx: -1
                    , ecl: "H"
                    , ecb: 1
                    , pal: ["black", "#fff"]
                    , vrb: 0

                })
            ];

            //integrando
            for (var c = 0; c < qrcodes.length; c++) {
                //document.body.appendChild( qrcodes[ c ] );
                console.log(datas)
                datas.qr = qrcodes[c]
                var product_final = datas.name;
                var QR = qrcodes[c].innerHTML
                var color = window.getComputedStyle(document.body).getPropertyValue('background-color');
                var source = "f4"
                var idc = datas.id

                Integration(QR, product_final, color, source, idc)
            }
        } else{
            alert("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE MÁXIMO 16 CARACTERES, ANALISE E TENTE NOVAMENTE!");
            console.log("ERRO: FOI IDENTIFICADO ID QUE NÃO ATENDE AO CRITÉRIO DE MÁXIMO 16 CARACTERES, ANALISE E TENTE NOVAMENTE!");
        }
    }
}

function printScreen(){
    document.getElementById('container-f3').style.display = 'none';
    document.getElementById('colorButton').style.display = 'none';
    document.getElementById('openCardButton').style.display = 'none';
    document.querySelector('.floating-symbols').style.display = 'none';
    window.print();

}
var svgBlobs = [];

function DownloadSvg(element, fileName, source) {
    if (source == 'f1') {
        // Verificar se o elemento é uma string (código SVG) ou um elemento DOM
        var svgContent = typeof element === 'string' ? element : new XMLSerializer().serializeToString(element);

        // Criar um objeto Blob para representar o SVG como um arquivo
        var blob = new Blob([svgContent], { type: 'image/svg+xml' });

        // Criar um elemento <a> para o download
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${fileName}.svg`;

        // Adicionar o elemento <a> ao corpo do documento e simular o clique
        document.body.appendChild(a);
        a.click();

        // Remover o elemento <a> do corpo do documento
        document.body.removeChild(a);
    }
    if (source == 'f2') {
        // Verificar se o elemento é uma string (código SVG) ou um elemento DOM
        var svgContent = typeof element === 'string' ? element : new XMLSerializer().serializeToString(element);

        // Criar um objeto Blob para representar o SVG como um arquivo
        var blob = new Blob([svgContent], { type: 'image/svg+xml' });

        // Adicionar o blob ao array svgBlobs
        svgBlobs.push({ name: `${fileName}.svg`, blob: blob });
    }
    if (source == 'f3') {

    }
    if (source == 'f4') {
        // Verificar se o elemento é uma string (código SVG) ou um elemento DOM
        var svgContent = typeof element === 'string' ? element : new XMLSerializer().serializeToString(element);
    
        // Criar uma imagem SVG para renderizar no canvas
        var img = new Image();
        var svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
        var url = URL.createObjectURL(svgBlob);
    
        img.onload = function () {
            // Criar um canvas para desenhar a imagem
            var canvas = document.createElement('canvas');
            canvas.width = 425; // Usar número em vez de string para definir largura
            canvas.height = 850.39; // Usar número em vez de string para definir altura
            var ctx = canvas.getContext('2d');
    
            // Desenhar a imagem SVG no canvas
            ctx.drawImage(img, 0, 0);
    
            // Converter o conteúdo do canvas para PNG
            canvas.toBlob(function (blob) {
                // Criar um elemento <a> para o download
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `${fileName}.png`;
    
                // Adicionar o elemento <a> ao corpo do documento e simular o clique
                document.body.appendChild(a);
                a.click();
    
                // Remover o elemento <a> do corpo do documento
                document.body.removeChild(a);
            }, 'image/png');
    
            // Liberar a URL do objeto
            URL.revokeObjectURL(url);
        };
    
        // Definir a fonte da imagem SVG
        img.src = url;
    }
    
    
}

function DownloadAllAsZip() {
    var zip = new JSZip();

    // Adicionar blobs de SVG ao arquivo ZIP
    svgBlobs.forEach(function (svgBlob) {
        zip.file(svgBlob.name, svgBlob.blob);
    });

    // Gerar o arquivo ZIP
    zip.generateAsync({ type: "blob" }).then(function (content) {
        // Criar um elemento <a> para o download do arquivo ZIP
        var a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = 'svg_files.zip';

        // Adicionar o elemento <a> ao corpo do documento e simular o clique
        document.body.appendChild(a);
        a.click();

        // Remover o elemento <a> do corpo do documento
        document.body.removeChild(a);
    });
}


function Integration(QR, PRODUCT, color, source, idc) {
    if (color == "rgb(254, 196, 3)") {
        //fundo amarelo
        var svg_final = `<?xml version="1.0" encoding="utf-8"?>
        <!-- Generator: Adobe Illustrator 25.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 425.2 850.39" style="enable-background:new 0 0 425.2 850.39;" xml:space="preserve">
        <style type="text/css">
            .st0{fill:#006896;}
            .st1{clip-path:url(#SVGID_2_);fill:#FFB248;}
            .st2{clip-path:url(#SVGID_2_);fill:none;stroke:#FFFFFF;stroke-miterlimit:10;}
            .st3{fill:#FFB248;}
            .st4{fill:#FFFFFF;}
            .st5{fill:#F8B04C;}
        </style>
        <rect x="-226.77" y="198.43" transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 637.7953 212.5984)" class="st0" width="878.74" height="453.54"/>
        <g>
            <defs>
                
                    <rect id="SVGID_1_" x="-226.77" y="198.43" transform="matrix(3.464102e-07 -1 1 3.464102e-07 -212.5985 637.7951)" width="878.74" height="453.54"/>
            </defs>
            <clipPath id="SVGID_2_">
                <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
            </clipPath>
            <path class="st1" d="M-35.04-254.38l41.74,0c15.64,0,28.31,13.55,28.31,30.27l0,127.1c0,16.72,12.68,30.27,28.31,30.27l118.88,0
                c15.64,0,28.31,13.55,28.31,30.27l0,44.62c0,16.72-12.68,30.27-28.31,30.27l-118.88,0c-15.64,0-28.31,13.55-28.31,30.27l0,127.1
                c0,16.72-12.68,30.27-28.31,30.27l-41.74,0c-15.64,0-28.31-13.55-28.31-30.27l0-127.1c0-16.72-12.68-30.27-28.31-30.27l-118.89,0
                c-15.64,0-28.31-13.55-28.31-30.27l0-44.62c0-16.72,12.68-30.27,28.31-30.27l118.89,0c15.64,0,28.31-13.55,28.31-30.27l0-127.1
                C-63.35-240.83-50.68-254.38-35.04-254.38z"/>
            <path class="st2" d="M263.99,588.79h34.92c13.08,0,23.69,10.59,23.69,23.65l0,99.29c0,13.06,10.61,23.65,23.69,23.65h99.48
                c13.08,0,23.69,10.59,23.69,23.65v34.86c0,13.06-10.61,23.65-23.69,23.65h-99.48c-13.08,0-23.69,10.59-23.69,23.65l0,99.3
                c0,13.06-10.61,23.65-23.69,23.65h-34.92c-13.08,0-23.69-10.59-23.69-23.65l0-99.3c0-13.06-10.61-23.65-23.69-23.65l-99.48,0
                c-13.08,0-23.69-10.59-23.69-23.65l0-34.86c0-13.06,10.61-23.65,23.69-23.65l99.48,0c13.08,0,23.69-10.59,23.69-23.65l0-99.29
                C240.3,599.38,250.91,588.79,263.99,588.79z"/>
        </g>
        <rect x="389.07" y="-14.17" class="st3" width="52.04" height="878.74"/>
        <g>
            <path class="st4" d="M47.2,479.51v4.62H34v-21h13.05v4.62H38.8v3.48h7.5v4.56h-7.5v3.72H47.2z"/>
            <path class="st4" d="M72.25,474.92v9.21h-4.5v-8.82c0-1.5-0.72-2.46-2.16-2.46c-1.5,0-2.34,1.05-2.34,2.82v8.46h-4.5v-8.82
                c0-1.5-0.72-2.46-2.16-2.46c-1.5,0-2.34,1.05-2.34,2.82v8.46h-4.5v-15h4.5v1.38c0.69-1.02,2.01-1.8,4.02-1.8
                c1.77,0,3.09,0.72,3.93,1.98c0.84-1.2,2.22-1.98,4.35-1.98C70,468.71,72.25,471.17,72.25,474.92z"/>
            <path class="st4" d="M82.09,476.63c0-4.47,3.39-7.92,7.95-7.92c2.91,0,5.49,1.53,6.78,3.84l-3.93,2.28
                c-0.51-1.05-1.59-1.68-2.91-1.68c-1.95,0-3.39,1.41-3.39,3.48s1.44,3.48,3.39,3.48c1.32,0,2.43-0.63,2.91-1.68l3.93,2.25
                c-1.29,2.34-3.84,3.87-6.78,3.87C85.48,484.55,82.09,481.1,82.09,476.63z"/>
            <path class="st4" d="M113.71,469.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H113.71z M109.21,476.63c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66C107.71,480.29,109.21,478.88,109.21,476.63z"/>
            <path class="st4" d="M128.5,479.63c0,3.45-3,4.92-6.24,4.92c-3,0-5.28-1.14-6.45-3.57l3.9-2.22c0.39,1.14,1.23,1.77,2.55,1.77
                c1.08,0,1.62-0.33,1.62-0.93c0-1.65-7.38-0.78-7.38-5.97c0-3.27,2.76-4.92,5.88-4.92c2.43,0,4.59,1.08,5.85,3.21l-3.84,2.07
                c-0.42-0.78-1.02-1.32-2.01-1.32c-0.78,0-1.26,0.3-1.26,0.84C121.12,475.22,128.5,474.08,128.5,479.63z"/>
            <path class="st4" d="M129.85,476.63c0-4.47,3.54-7.92,7.95-7.92c4.41,0,7.95,3.45,7.95,7.92s-3.54,7.92-7.95,7.92
                C133.39,484.55,129.85,481.1,129.85,476.63z M141.25,476.63c0-2.13-1.5-3.54-3.45-3.54c-1.95,0-3.45,1.41-3.45,3.54
                s1.5,3.54,3.45,3.54C139.75,480.17,141.25,478.76,141.25,476.63z"/>
            <path class="st4" d="M171.19,463.13v21h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-7.41H171.19z M166.69,476.63c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66C165.19,480.29,166.69,478.88,166.69,476.63z"/>
            <path class="st4" d="M182.11,480.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92s3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8h-10.65
                C179.08,479.99,180.46,480.53,182.11,480.53z M184.87,475.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H184.87z"
                />
            <path class="st4" d="M213.79,474.92v9.21h-4.5v-8.55c0-1.86-1.17-2.73-2.61-2.73c-1.65,0-2.79,0.96-2.79,3.09v8.19h-4.5v-15h4.5
                v1.41c0.81-1.11,2.31-1.83,4.29-1.83C211.2,468.71,213.79,470.87,213.79,474.92z"/>
            <path class="st4" d="M224.49,480.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92s3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8H220.9
                C221.46,479.99,222.85,480.53,224.49,480.53z M227.25,475.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H227.25z"
                />
            <path class="st4" d="M233.38,476.63c0-4.47,3.39-7.92,7.95-7.92c2.91,0,5.49,1.53,6.78,3.84l-3.93,2.28
                c-0.51-1.05-1.59-1.68-2.91-1.68c-1.95,0-3.39,1.41-3.39,3.48s1.44,3.48,3.39,3.48c1.32,0,2.43-0.63,2.91-1.68l3.93,2.25
                c-1.29,2.34-3.84,3.87-6.78,3.87C236.77,484.55,233.38,481.1,233.38,476.63z"/>
            <path class="st4" d="M257.22,480.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92s3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8h-10.65
                C254.2,479.99,255.58,480.53,257.22,480.53z M259.98,475.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H259.98z"
                />
            <path class="st4" d="M278.04,479.63c0,3.45-3,4.92-6.24,4.92c-3,0-5.28-1.14-6.45-3.57l3.9-2.22c0.39,1.14,1.23,1.77,2.55,1.77
                c1.08,0,1.62-0.33,1.62-0.93c0-1.65-7.38-0.78-7.38-5.97c0-3.27,2.76-4.92,5.88-4.92c2.43,0,4.59,1.08,5.85,3.21l-3.84,2.07
                c-0.42-0.78-1.02-1.32-2.01-1.32c-0.78,0-1.26,0.3-1.26,0.84C270.66,475.22,278.04,474.08,278.04,479.63z"/>
            <path class="st4" d="M291.18,479.63c0,3.45-3,4.92-6.24,4.92c-3,0-5.28-1.14-6.45-3.57l3.9-2.22c0.39,1.14,1.23,1.77,2.55,1.77
                c1.08,0,1.62-0.33,1.62-0.93c0-1.65-7.38-0.78-7.38-5.97c0-3.27,2.76-4.92,5.88-4.92c2.43,0,4.59,1.08,5.85,3.21l-3.84,2.07
                c-0.42-0.78-1.02-1.32-2.01-1.32c-0.78,0-1.26,0.3-1.26,0.84C283.8,475.22,291.18,474.08,291.18,479.63z"/>
            <path class="st4" d="M292.99,465.11c0-1.47,1.23-2.7,2.7-2.7c1.47,0,2.7,1.23,2.7,2.7s-1.23,2.7-2.7,2.7
                C294.21,467.81,292.99,466.58,292.99,465.11z M293.44,469.13h4.5v15h-4.5V469.13z"/>
            <path class="st4" d="M316.62,463.13v21h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-7.41H316.62z M312.12,476.63c0-2.25-1.5-3.66-3.57-3.66s-3.57,1.41-3.57,3.66
                s1.5,3.66,3.57,3.66S312.12,478.88,312.12,476.63z"/>
            <path class="st4" d="M335.31,469.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H335.31z M330.81,476.63c0-2.25-1.5-3.66-3.57-3.66s-3.57,1.41-3.57,3.66
                s1.5,3.66,3.57,3.66S330.81,478.88,330.81,476.63z"/>
            <path class="st4" d="M354,463.13v21h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92s3.24-7.92,7.17-7.92
                c2.01,0,3.48,0.69,4.47,1.83v-7.41H354z M349.5,476.63c0-2.25-1.5-3.66-3.57-3.66s-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66
                S349.5,478.88,349.5,476.63z"/>
            <path class="st4" d="M364.92,480.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92s3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8h-10.65
                C361.89,479.99,363.27,480.53,364.92,480.53z M367.68,475.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H367.68z"
                />
            <path class="st4" d="M49.24,499.13v21h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                c0-4.47,3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-7.41H49.24z M44.74,512.63c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66c0,2.25,1.5,3.66,3.57,3.66C43.24,516.29,44.74,514.88,44.74,512.63z"/>
            <path class="st4" d="M60.16,516.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92c0-4.47,3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8H56.56
                C57.13,515.99,58.51,516.53,60.16,516.53z M62.92,511.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H62.92z"/>
            <path class="st4" d="M86.44,504.83v5.1c-1.86-0.3-4.5,0.45-4.5,3.42v6.78h-4.5v-15h4.5v2.67
                C82.54,505.79,84.55,504.83,86.44,504.83z"/>
            <path class="st4" d="M95.71,516.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92c0-4.47,3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8H92.11
                C92.68,515.99,94.06,516.53,95.71,516.53z M98.47,511.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H98.47z"/>
            <path class="st4" d="M121.62,512.63c0,4.47-3.24,7.92-7.17,7.92c-2.01,0-3.48-0.69-4.47-1.83v7.41h-4.5v-21h4.5v1.41
                c0.99-1.14,2.46-1.83,4.47-1.83C118.38,504.71,121.62,508.16,121.62,512.63z M117.12,512.63c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66c0,2.25,1.5,3.66,3.57,3.66C115.62,516.29,117.12,514.88,117.12,512.63z"/>
            <path class="st4" d="M139.56,505.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                c0-4.47,3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H139.56z M135.06,512.63c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66c0,2.25,1.5,3.66,3.57,3.66C133.56,516.29,135.06,514.88,135.06,512.63z"/>
            <path class="st4" d="M151.86,504.83v5.1c-1.86-0.3-4.5,0.45-4.5,3.42v6.78h-4.5v-15h4.5v2.67
                C147.96,505.79,149.97,504.83,151.86,504.83z"/>
            <path class="st4" d="M152.76,512.63c0-4.47,3.54-7.92,7.95-7.92c4.41,0,7.95,3.45,7.95,7.92c0,4.47-3.54,7.92-7.95,7.92
                C156.3,520.55,152.76,517.1,152.76,512.63z M164.16,512.63c0-2.13-1.5-3.54-3.45-3.54c-1.95,0-3.45,1.41-3.45,3.54
                c0,2.13,1.5,3.54,3.45,3.54C162.66,516.17,164.16,514.76,164.16,512.63z"/>
            <path class="st4" d="M173.32,524.33h-3.6l1.2-8.85h4.8L173.32,524.33z"/>
            <path class="st4" d="M197.85,515.63c0,3.45-3,4.92-6.24,4.92c-3,0-5.28-1.14-6.45-3.57l3.9-2.22c0.39,1.14,1.23,1.77,2.55,1.77
                c1.08,0,1.62-0.33,1.62-0.93c0-1.65-7.38-0.78-7.38-5.97c0-3.27,2.76-4.92,5.88-4.92c2.43,0,4.59,1.08,5.85,3.21l-3.84,2.07
                c-0.42-0.78-1.02-1.32-2.01-1.32c-0.78,0-1.26,0.3-1.26,0.84C190.48,511.22,197.85,510.08,197.85,515.63z"/>
            <path class="st4" d="M199.21,512.63c0-4.47,3.54-7.92,7.95-7.92s7.95,3.45,7.95,7.92c0,4.47-3.54,7.92-7.95,7.92
                S199.21,517.1,199.21,512.63z M210.61,512.63c0-2.13-1.5-3.54-3.45-3.54s-3.45,1.41-3.45,3.54c0,2.13,1.5,3.54,3.45,3.54
                S210.61,514.76,210.61,512.63z M208.78,503.03l3.48-4.2h-5.4l-2.4,4.2H208.78z"/>
            <path class="st4" d="M232.78,516.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92c0-4.47,3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8h-10.65
                C229.75,515.99,231.13,516.53,232.78,516.53z M235.54,511.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H235.54z"
                />
            <path class="st4" d="M253.59,515.63c0,3.45-3,4.92-6.24,4.92c-3,0-5.28-1.14-6.45-3.57l3.9-2.22c0.39,1.14,1.23,1.77,2.55,1.77
                c1.08,0,1.62-0.33,1.62-0.93c0-1.65-7.38-0.78-7.38-5.97c0-3.27,2.76-4.92,5.88-4.92c2.43,0,4.59,1.08,5.85,3.21l-3.84,2.07
                c-0.42-0.78-1.02-1.32-2.01-1.32c-0.78,0-1.26,0.3-1.26,0.84C246.22,511.22,253.59,510.08,253.59,515.63z"/>
            <path class="st4" d="M254.95,512.63c0-4.47,3.39-7.92,7.95-7.92c2.91,0,5.49,1.53,6.78,3.84l-3.93,2.28
                c-0.51-1.05-1.59-1.68-2.91-1.68c-1.95,0-3.39,1.41-3.39,3.48c0,2.07,1.44,3.48,3.39,3.48c1.32,0,2.43-0.63,2.91-1.68l3.93,2.25
                c-1.29,2.34-3.84,3.87-6.78,3.87C258.34,520.55,254.95,517.1,254.95,512.63z"/>
            <path class="st4" d="M286.56,505.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                c0-4.47,3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H286.56z M282.06,512.63c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66c0,2.25,1.5,3.66,3.57,3.66C280.56,516.29,282.06,514.88,282.06,512.63z"/>
            <path class="st4" d="M304.26,510.92v9.21h-4.5v-8.55c0-1.86-1.17-2.73-2.61-2.73c-1.65,0-2.79,0.96-2.79,3.09v8.19h-4.5v-15h4.5
                v1.41c0.81-1.11,2.31-1.83,4.29-1.83C301.68,504.71,304.26,506.87,304.26,510.92z"/>
            <path class="st4" d="M314.97,516.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92c0-4.47,3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8h-10.65
                C311.95,515.99,313.33,516.53,314.97,516.53z M317.73,511.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H317.73z"
                />
            <path class="st4" d="M339.99,505.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                c0-4.47,3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H339.99z M335.49,512.63c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66c0,2.25,1.5,3.66,3.57,3.66C333.99,516.29,335.49,514.88,335.49,512.63z"/>
            <path class="st4" d="M352.29,504.83v5.1c-1.86-0.3-4.5,0.45-4.5,3.42v6.78h-4.5v-15h4.5v2.67
                C348.39,505.79,350.4,504.83,352.29,504.83z"/>
            <path class="st4" d="M41.47,552.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92s3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8H37.87
                C38.44,551.99,39.82,552.53,41.47,552.53z M44.23,547.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H44.23z"/>
            <path class="st4" d="M62.29,551.62c0,3.45-3,4.92-6.24,4.92c-3,0-5.28-1.14-6.45-3.57l3.9-2.22c0.39,1.14,1.23,1.77,2.55,1.77
                c1.08,0,1.62-0.33,1.62-0.93c0-1.65-7.38-0.78-7.38-5.97c0-3.27,2.76-4.92,5.88-4.92c2.43,0,4.59,1.08,5.85,3.21l-3.84,2.07
                c-0.42-0.78-1.02-1.32-2.01-1.32c-0.78,0-1.26,0.3-1.26,0.84C54.91,547.22,62.29,546.08,62.29,551.62z"/>
            <path class="st4" d="M69.79,545.45v5.31c0,1.29,1.11,1.41,3.09,1.29v4.08c-5.88,0.6-7.59-1.17-7.59-5.37v-5.31h-2.4v-4.32h2.4
                v-2.85l4.5-1.35v4.2h3.09v4.32H69.79z"/>
            <path class="st4" d="M82.75,552.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92s3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8H79.15
                C79.72,551.99,81.1,552.53,82.75,552.53z M85.51,547.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H85.51z"/>
            <path class="st4" d="M118.72,552.49l2.1,2.22l-3.45,3.06l-2.25-2.37c-1.47,0.72-3.15,1.14-4.92,1.14
                c-6.03,0-10.92-4.74-10.92-10.92c0-6.18,4.89-10.92,10.92-10.92c6.03,0,10.92,4.74,10.92,10.92
                C121.12,548.27,120.22,550.63,118.72,552.49z M111.67,551.71l-3.03-3.21l3.45-3.06l3.36,3.57c0.54-0.96,0.87-2.1,0.87-3.39
                c0-3.75-2.7-6.24-6.12-6.24s-6.12,2.49-6.12,6.24c0,3.75,2.7,6.24,6.12,6.24C110.71,551.87,111.19,551.8,111.67,551.71z"/>
            <path class="st4" d="M131.05,549.23h-2.28v6.9h-4.8v-21h8.4c3.99,0,7.2,3.21,7.2,7.2c0,2.58-1.56,4.92-3.87,6.09l4.47,7.71h-5.16
                L131.05,549.23z M128.77,545.03h3.6c1.32,0,2.4-1.17,2.4-2.7c0-1.53-1.08-2.7-2.4-2.7h-3.6V545.03z"/>
            <path class="st4" d="M149.02,545.62c0-6.18,4.59-10.92,10.92-10.92c3.81,0,7.17,1.89,9,4.86l-4.14,2.4
                c-0.93-1.62-2.73-2.58-4.86-2.58c-3.72,0-6.12,2.49-6.12,6.24c0,3.75,2.4,6.24,6.12,6.24c2.13,0,3.96-0.96,4.86-2.58l4.14,2.4
                c-1.8,2.97-5.16,4.86-9,4.86C153.61,556.54,149.02,551.8,149.02,545.62z"/>
            <path class="st4" d="M170.44,548.62c0-4.47,3.54-7.92,7.95-7.92s7.95,3.45,7.95,7.92s-3.54,7.92-7.95,7.92
                S170.44,553.09,170.44,548.62z M181.84,548.62c0-2.13-1.5-3.54-3.45-3.54s-3.45,1.41-3.45,3.54s1.5,3.54,3.45,3.54
                S181.84,550.75,181.84,548.62z"/>
            <path class="st4" d="M204.28,535.13v21h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-7.41H204.28z M199.78,548.62c0-2.25-1.5-3.66-3.57-3.66s-3.57,1.41-3.57,3.66
                s1.5,3.66,3.57,3.66S199.78,550.87,199.78,548.62z"/>
            <path class="st4" d="M215.2,552.53c1.23,0,2.28-0.48,2.88-1.14l3.6,2.07c-1.47,2.04-3.69,3.09-6.54,3.09
                c-5.13,0-8.31-3.45-8.31-7.92s3.24-7.92,7.98-7.92c4.38,0,7.62,3.39,7.62,7.92c0,0.63-0.06,1.23-0.18,1.8H211.6
                C212.17,551.99,213.55,552.53,215.2,552.53z M217.96,547.07c-0.48-1.74-1.83-2.37-3.18-2.37c-1.71,0-2.85,0.84-3.27,2.37H217.96z"
                />
            <path class="st4" d="M248.62,548.62c0,4.47-3.24,7.92-7.17,7.92c-2.01,0-3.48-0.69-4.47-1.83v7.41h-4.5v-21h4.5v1.41
                c0.99-1.14,2.46-1.83,4.47-1.83C245.38,540.71,248.62,544.16,248.62,548.62z M244.12,548.62c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66C242.62,552.28,244.12,550.87,244.12,548.62z"/>
            <path class="st4" d="M266.55,541.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H266.55z M262.05,548.62c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66C260.55,552.28,262.05,550.87,262.05,548.62z"/>
            <path class="st4" d="M278.85,540.83v5.1c-1.86-0.3-4.5,0.45-4.5,3.42v6.78h-4.5v-15h4.5v2.67
                C274.95,541.78,276.96,540.83,278.85,540.83z"/>
            <path class="st4" d="M295.89,541.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H295.89z M291.39,548.62c0-2.25-1.5-3.66-3.57-3.66s-3.57,1.41-3.57,3.66
                s1.5,3.66,3.57,3.66S291.39,550.87,291.39,548.62z"/>
            <path class="st4" d="M322.08,541.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H322.08z M317.58,548.62c0-2.25-1.5-3.66-3.57-3.66s-3.57,1.41-3.57,3.66
                s1.5,3.66,3.57,3.66S317.58,550.87,317.58,548.62z"/>
            <path class="st4" d="M341.52,548.62c0,4.47-3.24,7.92-7.17,7.92c-2.01,0-3.48-0.69-4.47-1.83v1.41h-4.5v-21h4.5v7.41
                c0.99-1.14,2.46-1.83,4.47-1.83C338.28,540.71,341.52,544.16,341.52,548.62z M337.02,548.62c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66C335.52,552.28,337.02,550.87,337.02,548.62z"/>
            <path class="st4" d="M353.07,540.83v5.1c-1.86-0.3-4.5,0.45-4.5,3.42v6.78h-4.5v-15h4.5v2.67
                C349.17,541.78,351.18,540.83,353.07,540.83z"/>
            <path class="st4" d="M354.72,537.11c0-1.47,1.23-2.7,2.7-2.7c1.47,0,2.7,1.23,2.7,2.7c0,1.47-1.23,2.7-2.7,2.7
                C355.95,539.81,354.72,538.58,354.72,537.11z M355.17,541.13h4.5v15h-4.5V541.13z"/>
            <path class="st4" d="M371.97,540.83v5.1c-1.86-0.3-4.5,0.45-4.5,3.42v6.78h-4.5v-15h4.5v2.67
                C368.07,541.78,370.08,540.83,371.97,540.83z"/>
            <path class="st4" d="M48.04,577.13v15h-4.5v-1.41c-0.81,1.11-2.31,1.83-4.29,1.83c-3.03,0-5.61-2.16-5.61-6.21v-9.21h4.5v8.55
                c0,1.86,1.17,2.73,2.61,2.73c1.65,0,2.79-0.96,2.79-3.09v-8.19H48.04z"/>
            <path class="st4" d="M73.84,582.91v9.21h-4.5v-8.82c0-1.5-0.72-2.46-2.16-2.46c-1.5,0-2.34,1.05-2.34,2.82v8.46h-4.5v-8.82
                c0-1.5-0.72-2.46-2.16-2.46c-1.5,0-2.34,1.05-2.34,2.82v8.46h-4.5v-15h4.5v1.38c0.69-1.02,2.01-1.8,4.02-1.8
                c1.77,0,3.09,0.72,3.93,1.98c0.84-1.2,2.22-1.98,4.35-1.98C71.59,576.71,73.84,579.17,73.84,582.91z"/>
            <path class="st4" d="M83.68,584.62c0-4.47,3.39-7.92,7.95-7.92c2.91,0,5.49,1.53,6.78,3.84l-3.93,2.28
                c-0.51-1.05-1.59-1.68-2.91-1.68c-1.95,0-3.39,1.41-3.39,3.48c0,2.07,1.44,3.48,3.39,3.48c1.32,0,2.43-0.63,2.91-1.68l3.93,2.25
                c-1.29,2.34-3.84,3.87-6.78,3.87C87.07,592.54,83.68,589.09,83.68,584.62z"/>
            <path class="st4" d="M114.61,582.91v9.21h-4.5v-8.55c0-1.86-1.17-2.73-2.61-2.73c-1.65,0-2.79,0.96-2.79,3.09v8.19h-4.5v-21h4.5
                v7.41c0.81-1.11,2.31-1.83,4.29-1.83C112.03,576.71,114.61,578.87,114.61,582.91z"/>
            <path class="st4" d="M133.09,577.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H133.09z M128.59,584.62c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66C127.09,588.28,128.59,586.87,128.59,584.62z"/>
            <path class="st4" d="M158.88,582.91v9.21h-4.5v-8.82c0-1.5-0.72-2.46-2.16-2.46c-1.5,0-2.34,1.05-2.34,2.82v8.46h-4.5v-8.82
                c0-1.5-0.72-2.46-2.16-2.46c-1.5,0-2.34,1.05-2.34,2.82v8.46h-4.5v-15h4.5v1.38c0.69-1.02,2.01-1.8,4.02-1.8
                c1.77,0,3.09,0.72,3.93,1.98c0.84-1.2,2.22-1.98,4.35-1.98C156.63,576.71,158.88,579.17,158.88,582.91z"/>
            <path class="st4" d="M177.37,577.13v15h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-1.41H177.37z M172.87,584.62c0-2.25-1.5-3.66-3.57-3.66
                c-2.07,0-3.57,1.41-3.57,3.66s1.5,3.66,3.57,3.66C171.37,588.28,172.87,586.87,172.87,584.62z"/>
            <path class="st4" d="M196.06,571.13v21h-4.5v-1.41c-0.99,1.14-2.46,1.83-4.47,1.83c-3.93,0-7.17-3.45-7.17-7.92
                s3.24-7.92,7.17-7.92c2.01,0,3.48,0.69,4.47,1.83v-7.41H196.06z M191.56,584.62c0-2.25-1.5-3.66-3.57-3.66s-3.57,1.41-3.57,3.66
                s1.5,3.66,3.57,3.66S191.56,586.87,191.56,584.62z"/>
            <path class="st4" d="M198.61,584.62c0-4.47,3.54-7.92,7.95-7.92s7.95,3.45,7.95,7.92s-3.54,7.92-7.95,7.92
                S198.61,589.09,198.61,584.62z M210.01,584.62c0-2.13-1.5-3.54-3.45-3.54s-3.45,1.41-3.45,3.54s1.5,3.54,3.45,3.54
                S210.01,586.75,210.01,584.62z"/>
            <path class="st4" d="M216.16,579.49c0-1.56,1.29-2.85,2.85-2.85c1.56,0,2.85,1.29,2.85,2.85c0,1.56-1.29,2.85-2.85,2.85
                C217.45,582.35,216.16,581.06,216.16,579.49z M216.16,589.7c0-1.56,1.29-2.85,2.85-2.85c1.56,0,2.85,1.29,2.85,2.85
                c0,1.56-1.29,2.85-2.85,2.85C217.45,592.54,216.16,591.25,216.16,589.7z"/>
        </g>
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <g>
        <!-- Segundo grupo (renderizado por cima) -->
        <text x="30" y="300" fill="white" font-weight="900" font-size="15px" font-family="Arial">
            <tspan x="30" dy="0">${PRODUCT.length > 30 ? PRODUCT.substring(0, 30) : PRODUCT}</tspan>
            <tspan x="30" dy="1.5em">${PRODUCT.length > 30 ? (PRODUCT.substring(30).length > 30 ? PRODUCT.substring(30, 60) : PRODUCT.substring(30)) : ''}</tspan>
            <tspan x="30" dy="1.5em">${PRODUCT.length > 60 ? (PRODUCT.substring(60).length > 30 ? PRODUCT.substring(60, 90) : PRODUCT.substring(60)) : ''}</tspan>
            <tspan x="30" dy="1.5em">${PRODUCT.length > 90 ? (PRODUCT.substring(90).length > 30 ? PRODUCT.substring(90, 120) : PRODUCT.substring(90)) : ''}</tspan>
            <tspan x="30" dy="1.5em">${PRODUCT.length > 120 ? (PRODUCT.substring(120).length > 30 ? PRODUCT.substring(120, 150) : PRODUCT.substring(120)) : ''}</tspan>
        </text>
    </g>
    </svg>
        <svg x="35" y="610" viewBox="0 0 57 57" width="180" height="180" fill="#000" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" version="1.1">${QR}</svg>
        <g>
            <path class="st4" d="M111.54,57.58H74.78c-1.39,0-2.53,1.13-2.53,2.53v51.76c0,1.4,1.13,2.53,2.53,2.53h36.76
                c1.39,0,2.53-1.13,2.53-2.53v-5.19c0-1.4-1.13-2.53-2.53-2.53H85.88c-1.39,0-2.53-1.13-2.53-2.53v-8.58c0-1.4,1.13-2.53,2.53-2.53
                h20.63c1.39,0,2.53-1.13,2.53-2.53v-4.84c0-1.4-1.13-2.53-2.53-2.53H85.88c-1.39,0-2.53-1.13-2.53-2.53v-7.62
                c0-1.4,1.13-2.53,2.53-2.53h25.66c1.39,0,2.53-1.13,2.53-2.53v-5.28C114.06,58.71,112.93,57.58,111.54,57.58z"/>
            <path class="st4" d="M172.88,56.45c-7.46,0-12.81,2.87-16.05,8.6h-0.17c-3.3-5.73-8.65-8.6-16.05-8.6c-5.9,0-10.67,1.81-14.31,5.43
                c-3.64,3.62-5.47,8.93-5.47,15.94v34.04c0,1.4,1.13,2.53,2.53,2.53h6.05c1.39,0,2.53-1.13,2.53-2.53V77.82
                c0-3.71,0.88-6.47,2.65-8.3c1.76-1.82,4.09-2.74,6.98-2.74c2.89,0,5.22,0.91,6.98,2.74c1.76,1.82,2.65,4.59,2.65,8.3v34.04
                c0,1.4,1.13,2.53,2.53,2.53h6.05c1.39,0,2.53-1.13,2.53-2.53V77.82c0-3.71,0.88-6.47,2.65-8.3c1.76-1.82,4.09-2.74,6.98-2.74
                c2.89,0,5.22,0.91,6.98,2.74c1.76,1.82,2.65,4.59,2.65,8.3v34.04c0,1.4,1.13,2.53,2.53,2.53h6.05c1.39,0,2.53-1.13,2.53-2.53V77.82
                c0-7.01-1.82-12.32-5.47-15.94C183.55,58.26,178.78,56.45,172.88,56.45z"/>
            <path class="st4" d="M235.6,85.03v-0.17c4.91-2.43,7.37-6.6,7.37-12.51c0-4.46-1.42-8.04-4.25-10.73
                c-2.83-2.69-6.88-4.04-12.14-4.04h-24.63c-1.39,0-2.53,1.13-2.53,2.53v51.76c0,1.4,1.13,2.53,2.53,2.53h26.88
                c5.32,0,9.44-1.42,12.36-4.26c2.92-2.84,4.38-6.54,4.38-11.12c0-3.36-0.88-6.28-2.65-8.77C241.16,87.75,238.72,86.01,235.6,85.03z
                 M210.53,70.44c0-1.4,1.13-2.53,2.53-2.53h12.05c4.57,0,6.85,2.11,6.85,6.34c0,1.85-0.58,3.37-1.73,4.56
                c-1.16,1.19-2.83,1.78-5.03,1.78h-12.13c-1.39,0-2.53-1.13-2.53-2.53V70.44z M232.43,102.27c-1.19,1.25-3.02,1.87-5.51,1.87h-13.87
                c-1.39,0-2.53-1.13-2.53-2.53v-8.58c0-1.4,1.13-2.53,2.53-2.53h13.96c2.26,0,4.02,0.65,5.29,1.95c1.27,1.3,1.91,2.94,1.91,4.91
                C234.21,99.39,233.61,101.03,232.43,102.27z"/>
            <path class="st4" d="M292.73,87.37c1.97-3.07,2.95-6.75,2.95-11.03c0-5.73-1.72-10.29-5.16-13.68c-3.44-3.39-8.63-5.08-15.57-5.08
                H253.7c-1.39,0-2.53,1.13-2.53,2.53v51.76c0,1.4,1.13,2.53,2.53,2.53h6.05c1.39,0,2.53-1.13,2.53-2.53V97.72
                c0-1.4,1.13-2.53,2.53-2.53h6.32c0.87,0,1.68,0.45,2.14,1.18l10.57,16.83c0.46,0.74,1.27,1.18,2.14,1.18h7
                c2.03,0,3.23-2.28,2.08-3.96l-11.18-16.37v-0.17C287.81,92.62,290.76,90.45,292.73,87.37z M275.12,84.86h-10.31
                c-1.39,0-2.53-1.13-2.53-2.53V70.44c0-1.4,1.13-2.53,2.53-2.53h10.31c6.25,0,9.37,2.81,9.37,8.43
                C284.49,82.02,281.36,84.86,275.12,84.86z"/>
            <path class="st4" d="M328.05,56.45c-7.92,0-14.02,2.19-18.3,6.56c-4.28,4.37-6.42,10.41-6.42,18.11v30.74
                c0,1.4,1.13,2.53,2.53,2.53h5.79c1.39,0,2.53-1.13,2.53-2.53V99.89c0-1.4,1.13-2.53,2.53-2.53h22.62c1.39,0,2.53,1.13,2.53,2.53
                v11.97c0,1.4,1.13,2.53,2.53,2.53h6.05c1.39,0,2.53-1.13,2.53-2.53V81.12c0-7.7-2.17-13.74-6.51-18.11
                C342.1,58.63,335.97,56.45,328.05,56.45z M341.84,84.76c0,1.4-1.13,2.53-2.53,2.53h-22.62c-1.39,0-2.53-1.13-2.53-2.53v-3.64
                c0-4.63,1.16-8.18,3.47-10.64c2.31-2.46,5.75-3.69,10.32-3.69c4.63,0,8.1,1.23,10.41,3.69c2.31,2.46,3.47,6.01,3.47,10.64V84.76z"
                />
            <path class="st5" d="M138.91,122.65c-9.55,0-16.39,3.67-20.54,11.01h-0.22c-4.22-7.34-11.06-11.01-20.54-11.01
                c-7.55,0-13.65,2.32-18.32,6.95c-4.66,4.63-6.99,11.43-6.99,20.4v43.57c0,1.79,1.45,3.24,3.23,3.24h7.74
                c1.79,0,3.23-1.45,3.23-3.24V150c0-4.74,1.13-8.28,3.39-10.62c2.26-2.33,5.23-3.5,8.94-3.5c3.7,0,6.68,1.17,8.94,3.5
                c2.26,2.33,3.39,5.87,3.39,10.62v43.57c0,1.79,1.45,3.24,3.23,3.24h7.74c1.79,0,3.23-1.45,3.23-3.24V150
                c0-4.74,1.13-8.28,3.39-10.62c2.26-2.33,5.23-3.5,8.94-3.5c3.7,0,6.68,1.17,8.94,3.5c2.26,2.33,3.39,5.87,3.39,10.62v43.57
                c0,1.79,1.45,3.24,3.23,3.24h7.74c1.79,0,3.23-1.45,3.23-3.24V150c0-8.97-2.33-15.77-6.99-20.4
                C152.57,124.96,146.46,122.65,138.91,122.65z"/>
            <path class="st5" d="M235.08,170.71c-3.71-0.58-6.55-3.58-6.55-7.18v-6.5c0-3.48,2.66-6.4,6.19-7.12c0.81-0.16,1.37-0.91,1.26-1.73
                c-0.94-7-3.58-12.69-7.93-17.07c-5.55-5.6-13.4-8.39-23.53-8.39c-10.14,0-17.95,2.8-23.42,8.39c-5.48,5.6-8.22,13.32-8.22,23.18
                v39.34c0,1.79,1.45,3.24,3.23,3.24h7.41c1.79,0,3.23-1.45,3.23-3.24v-15.32c0-1.79,1.45-3.24,3.23-3.24h28.95
                c1.79,0,3.23,1.45,3.23,3.24v15.32c0,1.79,1.45,3.24,3.23,3.24h7.74c1.79,0,3.23-1.45,3.23-3.24v-21.38
                C236.39,171.49,235.84,170.83,235.08,170.71z M222.18,158.95c0,1.79-1.45,3.24-3.23,3.24H190c-1.79,0-3.23-1.45-3.23-3.24v-4.66
                c0-5.93,1.48-10.47,4.44-13.62c2.96-3.15,7.36-4.72,13.21-4.72c5.92,0,10.36,1.58,13.32,4.72c2.96,3.15,4.44,7.69,4.44,13.62
                V158.95z"/>
            <path class="st5" d="M348.96,162.67c-2.66-3.13-5.92-5.1-9.78-5.92c-3.86-0.81-7.66-1.61-11.38-2.4c-3.72-0.79-6.92-1.82-9.59-3.11
                c-2.67-1.29-4.01-3.3-4.01-6.02c0-2.8,1.04-5.1,3.11-6.9c2.07-1.8,5.03-2.71,8.88-2.71c3.85,0,6.81,0.87,8.88,2.61
                c1.46,1.23,2.43,2.75,2.89,4.55c0.37,1.42,1.66,2.4,3.13,2.4h7.01c2.02,0,3.56-1.84,3.18-3.83c-0.93-4.93-3.27-9.05-7-12.34
                c-4.66-4.11-10.73-6.17-18.21-6.17c-7.7,0-13.9,2.13-18.59,6.39c-4.7,4.26-7.05,9.77-7.05,16.51c0,0.89,0.04,1.75,0.11,2.58
                c0.07,0.81,0.74,1.43,1.55,1.43h0.4c4.34,0,7.87,3.27,7.87,7.28v5.01c0,0.6,0.34,1.15,0.88,1.41c0.46,0.22,0.92,0.43,1.4,0.63
                c2.29,0.96,4.64,1.67,7.05,2.12c2.4,0.45,4.77,0.89,7.1,1.33c2.33,0.44,4.4,0.91,6.22,1.43c1.81,0.52,3.27,1.37,4.39,2.56
                c1.11,1.19,1.66,2.67,1.66,4.45c0,2.97-1.11,5.32-3.33,7.06c-2.22,1.74-5.48,2.61-9.77,2.61c-4.22,0-7.44-0.87-9.66-2.61
                c-1.6-1.26-2.64-2.83-3.13-4.72c-0.36-1.39-1.65-2.34-3.08-2.34h-7.57c-2,0-3.52,1.8-3.19,3.78c0.85,5.14,3.25,9.35,7.21,12.62
                c4.88,4.04,11.36,6.06,19.43,6.06c8.14,0,14.67-2.06,19.59-6.17c4.92-4.11,7.38-9.69,7.38-16.73
                C352.94,170.08,351.61,165.8,348.96,162.67z"/>
            <path class="st4" d="M307.53,163.83v-7.03c0-2.63-2.13-4.77-4.75-4.77h-19.95c-2.62,0-4.75-2.13-4.75-4.77v-20.02
                c0-2.63-2.13-4.77-4.75-4.77h-7c-2.62,0-4.75,2.13-4.75,4.77v20.02c0,2.63-2.13,4.77-4.75,4.77h-19.95c-2.62,0-4.75,2.13-4.75,4.77
                v7.03c0,2.63,2.13,4.77,4.75,4.77h19.95c2.62,0,4.75,2.13,4.75,4.77v20.02c0,2.63,2.13,4.77,4.75,4.77h7
                c2.62,0,4.75-2.13,4.75-4.77v-20.02c0-2.63,2.13-4.77,4.75-4.77h19.95C305.4,168.6,307.53,166.47,307.53,163.83z"/>
                <text x="35" y="810" fill="white" font-weight="900" font-size="17px" font-family="Arial">${idc}</text>
        </g>
        </svg>`

        if (source == 'f3'){
            var parser = new DOMParser();
            var svgElement = parser.parseFromString(svg_final, 'image/svg+xml').documentElement;
    
            // Definir dimensões visíveis para o SVG
            svgElement.setAttribute('width', '20%');
            svgElement.setAttribute('height', '20%');
    
            // Adicionar o SVG ao body
            document.getElementById('root').appendChild(svgElement);
        } else{
        var parser = new DOMParser();
        var svgElement = parser.parseFromString(svg_final, 'image/svg+xml').documentElement;

        // Definir dimensões visíveis para o SVG
        svgElement.setAttribute('width', '20%');
        svgElement.setAttribute('height', '20%');

        // Adicionar o SVG ao body
        document.body.appendChild(svgElement);
        DownloadSvg(svg_final, PRODUCT, source);
        }

       
    }
    else if (color == "rgb(255, 255, 255)") {
        //fundo branco
        alert("VERSÃO BRANCO AINDA NÃO ESTÁ DISPONÍVEL")
    }
    else {
        alert("ERRO: TEMPLATE NÃO IDENTIFICADO, VERIFIQUE E TENTE NOVAMENTE! ESCOLHIDO: " + color)
    }
}



//GERADORDO QR CODE
/** https://github.com/datalog/qrcode-svg under MIT license */
'use strict'; function QRCode(r) { var n, t, o, e, a = [], f = [], i = Math.max, u = Math.min, h = Math.abs, v = Math.ceil, c = /^[0-9]*$/, s = /^[A-Z0-9 $%*+.\/:-]*$/, l = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:", g = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]], d = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]], m = { L: [0, 1], M: [1, 0], Q: [2, 3], H: [3, 2] }, p = function (r, n) { for (var t = 0, o = 8; o--;)t = t << 1 ^ 285 * (t >>> 7) ^ (n >>> o & 1) * r; return t }, C = function (r, n) { for (var t = [], o = r.length, e = o; e;)for (var a = r[o - e--] ^ t.shift(), f = n.length; f--;)t[f] ^= p(n[f], a); return t }, w = function (r) { for (var n = [function () { return 0 == (t + o) % 2 }, function () { return 0 == t % 2 }, function () { return 0 == o % 3 }, function () { return 0 == (t + o) % 3 }, function () { return 0 == ((t / 2 | 0) + (o / 3 | 0)) % 2 }, function () { return 0 == t * o % 2 + t * o % 3 }, function () { return 0 == (t * o % 2 + t * o % 3) % 2 }, function () { return 0 == ((t + o) % 2 + t * o % 3) % 2 }][r], t = e; t--;)for (var o = e; o--;)f[t][o] || (a[t][o] ^= n()) }, b = function () { for (var r = function (r, n) { n[6] || (r += e), n.shift(), n.push(r) }, n = function (n, o, a) { return n && (r(o, a), o = 0), r(o += e, a), t(a) }, t = function (r) { var n = r[5], t = n > 0 && r[4] == n && r[3] == 3 * n && r[2] == n && r[1] == n; return (t && r[6] >= 4 * n && r[0] >= n ? 1 : 0) + (t && r[0] >= 4 * n && r[6] >= n ? 1 : 0) }, o = 0, f = e * e, i = 0, u = e; u--;) { for (var c = [0, 0, 0, 0, 0, 0, 0], s = [0, 0, 0, 0, 0, 0, 0], l = !1, g = !1, d = 0, m = 0, p = e; p--;) { a[u][p] == l ? 5 == ++d ? o += 3 : d > 5 && o++ : (r(d, c), o += 40 * t(c), d = 1, l = a[u][p]), a[p][u] == g ? 5 == ++m ? o += 3 : m > 5 && o++ : (r(m, s), o += 40 * t(s), m = 1, g = a[p][u]); var C = a[u][p]; C && i++, p && u && C == a[u][p - 1] && C == a[u - 1][p] && C == a[u - 1][p - 1] && (o += 3) } o += 40 * n(l, d, c) + 40 * n(g, m, s) } return o += 10 * (v(h(20 * i - 10 * f) / f) - 1) }, A = function (r, n, t) { for (; n--;)t.push(r >>> n & 1) }, M = function (r, n) { return r.numBitsCharCount[(n + 7) / 17 | 0] }, B = function (r, n) { return 0 != (r >>> n & 1) }, x = function (r, n) { for (var t = 0, o = r.length; o--;) { var e = r[o], a = M(e, n); if (1 << a <= e.numChars) return 1 / 0; t += 4 + a + e.bitData.length } return t }, D = function (r) { if (r < 1 || r > 40) throw "Version number out of range"; var n = (16 * r + 128) * r + 64; if (r >= 2) { var t = r / 7 | 2; n -= (25 * t - 10) * t - 55, r >= 7 && (n -= 36) } return n }, I = function (r, n) { for (var t = 2; -2 <= t; t--)for (var o = 2; -2 <= o; o--)E(r + o, n + t, 1 != i(h(o), h(t))) }, H = function (r, n) { for (var t = 4; -4 <= t; t--)for (var o = 4; -4 <= o; o--) { var a = i(h(o), h(t)), f = r + o, u = n + t; 0 <= f && f < e && 0 <= u && u < e && E(f, u, 2 != a && 4 != a) } }, $ = function (r) { for (var n = t[1] << 3 | r, o = n, a = 10; a--;)o = o << 1 ^ 1335 * (o >>> 9); var f = 21522 ^ (n << 10 | o); if (f >>> 15 != 0) throw "Assertion error"; for (a = 0; a <= 5; a++)E(8, a, B(f, a)); E(8, 7, B(f, 6)), E(8, 8, B(f, 7)), E(7, 8, B(f, 8)); for (a = 9; a < 15; a++)E(14 - a, 8, B(f, a)); for (a = 0; a < 8; a++)E(e - 1 - a, 8, B(f, a)); for (a = 8; a < 15; a++)E(8, e - 15 + a, B(f, a)); E(8, e - 8, 1) }, O = function () { for (var r = e; r--;)E(6, r, 0 == r % 2), E(r, 6, 0 == r % 2); for (var t = function () { var r = []; if (n > 1) for (var t = 2 + (n / 7 | 0), o = 32 == n ? 26 : 2 * v((e - 13) / (2 * t - 2)); t--;)r[t] = t * o + 6; return r }(), o = r = t.length; o--;)for (var a = r; a--;)0 == a && 0 == o || 0 == a && o == r - 1 || a == r - 1 && 0 == o || I(t[a], t[o]); H(3, 3), H(e - 4, 3), H(3, e - 4), $(0), function () { if (!(7 > n)) { for (var r = n, t = 12; t--;)r = r << 1 ^ 7973 * (r >>> 11); var o = n << 12 | r; if (t = 18, o >>> 18 != 0) throw "Assertion error"; for (; t--;) { var a = e - 11 + t % 3, f = t / 3 | 0, i = B(o, t); E(a, f, i), E(f, a, i) } } }() }, Q = function (r) { if (r.length != V(n, t)) throw "Invalid argument"; for (var o = d[t[0]][n], e = g[t[0]][n], a = D(n) / 8 | 0, f = o - a % o, i = a / o | 0, u = [], h = function (r) { var n = 1, t = []; t[r - 1] = 1; for (var o = 0; o < r; o++) { for (var e = 0; e < r; e++)t[e] = p(t[e], n) ^ t[e + 1]; n = p(n, 2) } return t }(e), v = 0, c = 0; v < o; v++) { var s = r.slice(c, c + i - e + (v < f ? 0 : 1)); c += s.length; var l = C(s, h); v < f && s.push(0), u.push(s.concat(l)) } var m = []; for (v = 0; v < u[0].length; v++)for (var w = 0; w < u.length; w++)(v != i - e || w >= f) && m.push(u[w][v]); return m }, S = function (r) { for (var n = [], t = (r = encodeURI(r), 0); t < r.length; t++)"%" != r.charAt(t) ? n.push(r.charCodeAt(t)) : (n.push(parseInt(r.substr(t + 1, 2), 16)), t += 2); return n }, V = function (r, n) { return (D(r) / 8 | 0) - g[n[0]][r] * d[n[0]][r] }, E = function (r, n, t) { a[n][r] = t ? 1 : 0, f[n][r] = 1 }, R = function (r) { for (var n = [], t = 0, o = r; t < o.length; t++) { var e = o[t]; A(e, 8, n) } return { modeBits: 4, numBitsCharCount: [8, 16, 16], numChars: r.length, bitData: n } }, Z = function (r) { if (!c.test(r)) throw "String contains non-numeric characters"; for (var n = [], t = 0; t < r.length;) { var o = u(r.length - t, 3); A(parseInt(r.substr(t, o), 10), 3 * o + 1, n), t += o } return { modeBits: 1, numBitsCharCount: [10, 12, 14], numChars: r.length, bitData: n } }, z = function (r) { if (!s.test(r)) throw "String contains unencodable characters in alphanumeric mode"; var n, t = []; for (n = 0; n + 2 <= r.length; n += 2) { var o = 45 * l.indexOf(r.charAt(n)); o += l.indexOf(r.charAt(n + 1)), A(o, 11, t) } return n < r.length && A(l.indexOf(r.charAt(n)), 6, t), { modeBits: 2, numBitsCharCount: [9, 11, 13], numChars: r.length, bitData: t } }, L = function (r, n, t, o) { var e = function (r) { return "" == r ? [] : c.test(r) ? [Z(r)] : s.test(r) ? [z(r)] : [R(S(r))] }(r); return U(e, n, t, o) }, N = function (r, i, u, h) { t = i, o = h; for (var v = e = 4 * (n = r) + 17; v--;)a[v] = [], f[v] = []; if (O(), function (r) { for (var n = 0, t = 1, o = e - 1, i = o; i > 0; i -= 2) { 6 == i && --i; for (var u = 0 > (t = -t) ? o : 0, h = 0; h < e; ++h) { for (var v = i; v > i - 2; --v)f[u][v] || (a[u][v] = B(r[n >>> 3], 7 - (7 & n)), ++n); u += t } } }(Q(u)), 0 > o) { var c = 1e9; for (v = 8; v--;) { w(v), $(v); var s = b(); c > s && (c = s, o = v), w(v) } } w(o), $(o), f = [] }, U = function (r, n, t, o, e, a) { if (void 0 === e && (e = 1), void 0 === a && (a = 40), void 0 === o && (o = -1), void 0 === t && (t = !0), !(1 <= e && e <= a && a <= 40) || o < -1 || o > 7) throw "Invalid value"; for (var f = [], i = 236, h = [], v = e; ;) { var c = x(r, v); if (c <= 8 * V(v, n)) break; if (v >= a) throw "Data too long"; v++ } if (t) for (var s = (l = [m.H, m.Q, m.M]).length; s--;)c <= 8 * V(v, l[s]) && (n = l[s]); for (var l = 0; l < r.length; l++) { var g = r[l]; A(g.modeBits, 4, f), A(g.numChars, M(g, v), f); for (var d = 0, p = g.bitData; d < p.length; d++)f.push(p[d]) } if (f.length != c) throw "Assertion error"; var C = 8 * V(v, n); if (f.length > C) throw "Assertion error"; if (A(0, u(4, C - f.length), f), A(0, (8 - f.length % 8) % 8, f), f.length % 8 != 0) throw "Assertion error"; for (; f.length < C;)A(i, 8, f), i ^= 253; for (s = f.length; s--;)h[s >>> 3] |= f[s] << 7 - (7 & s); return N(v, n, h, o) }; return function () { function n(r) { return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(r) } function t(r, n) { for (var t in r = document.createElementNS(s, r), n || {}) r.setAttribute(t, n[t]); return r } var o, f, i, u, v, c, s = "http://www.w3.org/2000/svg", l = "", g = "string" == typeof r ? { msg: r } : r || {}, d = g.pal || ["#000"], p = h(g.dim) || 256, C = [1, 0, 0, 1, c = (c = h(g.pad)) > -1 ? c : 4, c], w = n(w = d[0]) ? w : "#000", b = n(b = d[1]) ? b : 0, A = g.vrb ? 0 : 1; for (L(g.msg || "", m[g.ecl] || m.M, 0 == g.ecb ? 0 : 1, g.mtx), v = e + 2 * c, i = e; i--;)for (u = 0, f = e; f--;)a[i][f] && (A ? (u++, a[i][f - 1] || (l += "M" + f + "," + i + "h" + u + "v1h-" + u + "v-1z", u = 0)) : l += "M" + f + "," + i + "h1v1h-1v-1z"); return o = t("svg", { viewBox: [0, 0, v, v].join(" "), width: p, height: p, fill: w, "shape-rendering": "crispEdges", xmlns: s, version: "1.1" }), b && o.appendChild(t("path", { fill: b, d: "M0,0V" + v + "H" + v + "V0H0Z" })), o.appendChild(t("path", { transform: "matrix(" + C + ")", d: l })), o }() }