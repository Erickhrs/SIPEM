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
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg" y="300" x="4%">
        <g>
        <!-- Segundo grupo (renderizado por cima) -->
     <text y="320" x="50%" fill="white" font-weight="900" font-size="15px" font-family="Arial" text-anchor="middle">
    <tspan x="50%" dy="0">${PRODUCT.length > 34 ? PRODUCT.substring(0, 34) : PRODUCT}</tspan>
    <tspan x="50%" dy="1.5em">${PRODUCT.length > 34 ? (PRODUCT.substring(34).length > 34 ? PRODUCT.substring(34, 68) : PRODUCT.substring(34)) : ''}</tspan>
    <tspan x="50%" dy="1.5em">${PRODUCT.length > 68 ? (PRODUCT.substring(68).length > 34 ? PRODUCT.substring(68, 102) : PRODUCT.substring(68)) : ''}</tspan>
    <tspan x="50%" dy="1.5em">${PRODUCT.length > 102 ? (PRODUCT.substring(102).length > 34 ? PRODUCT.substring(102, 136) : PRODUCT.substring(102)) : ''}</tspan>
    <tspan x="50%" dy="1.5em">${PRODUCT.length > 136 ? (PRODUCT.substring(136).length > 34 ? PRODUCT.substring(136, 170) : PRODUCT.substring(136)) : ''}</tspan>
</text>


    </g>
    </svg>
        <svg x="-20" y="215" viewBox="0 0 57 57" width="450" height="380" fill="#000" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" version="1.1">${QR}</svg>
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
                <text x="405" y="218" fill="white" font-weight="900" font-size="17px" font-family="Arial" writing-mode="tb" glyph-orientation-vertical="0">${idc}</text>
        </g>
        <svg xmlns="http://www.w3.org/2000/svg" id="Camada_1" data-name="Camada 1" viewBox="0 0 170.08 340.16" y="25">
  <defs>
    <style>.cls-1,.cls-5{fill:none;}.cls-2{fill:#006896;}.cls-3{clip-path:url(#clip-path);}.cls-4{fill:#ffb248;}.cls-5{stroke:#fff;}.cls-5,.cls-9{stroke-miterlimit:10;}.cls-6{isolation:isolate;}.cls-7{fill:#fff;}.cls-8{fill:#f8b04c;}.cls-9{fill:#016997;stroke:#026a98;}</style>
  </defs>
  <path class="cls-9" d="M 6.78 282.678 L 13.39 282.678 C 13.734 282.673 14.01 282.392 14.01 282.048 L 14.01 280.468 C 14.01 280.126 13.732 279.848 13.39 279.848 L 9.39 279.848 L 9.39 279.118 L 12.72 279.118 C 13.064 279.118 13.345 278.842 13.35 278.498 L 13.35 276.958 C 13.345 276.614 13.064 276.338 12.72 276.338 L 9.37 276.338 L 9.37 275.678 L 13.23 275.678 C 13.572 275.678 13.85 275.4 13.85 275.058 L 13.85 273.478 C 13.85 273.134 13.574 272.853 13.23 272.848 L 6.78 272.848 C 6.436 272.853 6.16 273.134 6.16 273.478 L 6.16 281.998 C 6.131 282.361 6.416 282.673 6.78 282.678 Z"/>
  <path class="cls-9" d="M 26.52 282.038 L 26.52 278.288 C 26.579 277.328 26.251 276.385 25.61 275.668 C 24.97 275.054 24.106 274.729 23.22 274.768 C 22.666 274.762 22.117 274.875 21.61 275.098 C 21.351 275.214 21.108 275.366 20.89 275.548 C 20.689 275.367 20.464 275.215 20.22 275.098 C 19.293 274.68 18.236 274.655 17.29 275.028 L 17.13 275.108 C 17.016 274.952 16.834 274.859 16.64 274.858 L 14.82 274.858 C 14.476 274.863 14.2 275.144 14.2 275.488 L 14.2 282.038 C 14.2 282.382 14.476 282.663 14.82 282.668 L 16.72 282.668 C 17.068 282.668 17.35 282.386 17.35 282.038 L 17.35 278.748 C 17.327 278.444 17.408 278.14 17.58 277.888 C 17.726 277.723 17.941 277.638 18.16 277.658 C 18.42 277.658 18.78 277.658 18.78 278.578 L 18.78 282.038 C 18.78 282.382 19.056 282.663 19.4 282.668 L 21.3 282.668 C 21.648 282.668 21.93 282.386 21.93 282.038 L 21.93 278.748 C 21.907 278.444 21.988 278.14 22.16 277.888 C 22.308 277.72 22.528 277.635 22.75 277.658 C 22.914 277.639 23.077 277.698 23.19 277.818 C 23.331 278.045 23.394 278.312 23.37 278.578 L 23.37 282.038 C 23.364 282.375 23.624 282.657 23.96 282.678 L 25.86 282.678 C 26.224 282.695 26.526 282.402 26.52 282.038 Z"/>
  <path class="cls-9" d="M 59.01 276.678 C 58.649 276.067 58.122 275.571 57.49 275.248 C 56.138 274.578 54.552 274.578 53.2 275.248 C 52.567 275.574 52.038 276.069 51.67 276.678 C 51.346 277.225 51.161 277.843 51.13 278.478 C 50.909 278.237 50.645 278.04 50.35 277.898 C 50.511 277.839 50.643 277.721 50.72 277.568 L 51.36 276.208 C 51.492 275.917 51.384 275.573 51.11 275.408 C 50.699 275.175 50.253 275.01 49.79 274.918 C 48.676 274.647 47.508 274.696 46.42 275.058 C 45.892 275.255 45.433 275.603 45.1 276.058 C 44.774 276.482 44.602 277.004 44.61 277.538 C 44.58 278.115 44.782 278.68 45.17 279.108 C 45.299 279.247 45.443 279.371 45.6 279.478 L 45.54 279.478 C 45.364 279.522 45.216 279.643 45.14 279.808 L 44.62 280.938 L 44.62 278.308 C 44.691 277.318 44.326 276.346 43.62 275.648 C 42.845 275.023 41.864 274.709 40.87 274.768 C 40.292 274.769 39.717 274.846 39.16 274.998 C 38.632 275.139 38.131 275.369 37.68 275.678 C 37.472 275.828 37.381 276.092 37.45 276.338 C 37.159 275.899 36.769 275.536 36.31 275.278 C 34.958 274.608 33.372 274.608 32.02 275.278 C 31.399 275.603 30.875 276.086 30.5 276.678 C 29.294 278.629 30.003 281.193 32.04 282.248 C 32.713 282.584 33.457 282.756 34.21 282.748 C 34.95 282.765 35.682 282.586 36.33 282.228 C 36.778 281.989 37.162 281.646 37.45 281.228 C 37.491 281.331 37.537 281.431 37.59 281.528 C 37.862 281.942 38.247 282.268 38.7 282.468 C 39.194 282.685 39.73 282.79 40.27 282.778 C 40.796 282.793 41.319 282.69 41.8 282.478 C 41.923 282.605 42.093 282.677 42.27 282.678 L 44.04 282.678 C 44.384 282.678 44.665 282.402 44.67 282.058 L 44.67 281.858 L 44.78 281.968 C 45.223 282.238 45.706 282.437 46.21 282.558 C 46.785 282.707 47.376 282.781 47.97 282.778 C 48.609 282.79 49.246 282.688 49.85 282.478 C 50.375 282.295 50.839 281.969 51.19 281.538 C 51.382 281.288 51.521 281.003 51.6 280.698 C 51.619 280.75 51.643 280.8 51.67 280.848 C 52.04 281.455 52.569 281.949 53.2 282.278 C 53.866 282.616 54.604 282.787 55.35 282.778 C 56.093 282.788 56.828 282.617 57.49 282.278 C 58.118 281.949 58.643 281.455 59.01 280.848 C 59.384 280.223 59.578 279.507 59.57 278.778 C 59.587 278.039 59.393 277.31 59.01 276.678 Z M 38.13 278.188 C 37.621 278.569 37.294 279.145 37.23 279.778 L 35.96 279.128 C 35.659 278.957 35.277 279.065 35.11 279.368 C 34.943 279.729 34.578 279.957 34.18 279.948 C 33.887 279.959 33.602 279.851 33.39 279.648 C 33.176 279.403 33.068 279.083 33.09 278.758 C 33.067 278.436 33.175 278.119 33.39 277.878 C 33.594 277.663 33.884 277.549 34.18 277.568 C 34.58 277.561 34.946 277.793 35.11 278.158 C 35.28 278.451 35.651 278.557 35.95 278.398 L 37.43 277.608 C 37.664 277.478 37.786 277.21 37.73 276.948 L 38.17 277.788 C 38.218 277.888 38.295 277.972 38.39 278.028 L 38.13 278.188 Z M 48.57 277.448 L 48.43 277.448 C 48.772 277.455 49.11 277.519 49.43 277.638 L 48.57 277.448 Z"/>
  <path class="cls-9" d="M 70.96 272.998 L 70.96 281.998 C 70.955 282.342 70.674 282.618 70.33 282.618 L 68.52 282.618 C 68.332 282.621 68.152 282.541 68.03 282.398 C 67.54 282.619 67.007 282.728 66.47 282.718 C 65.772 282.732 65.082 282.563 64.47 282.228 C 63.871 281.895 63.378 281.399 63.05 280.798 C 62.384 279.491 62.384 277.945 63.05 276.638 C 63.381 276.038 63.873 275.543 64.47 275.208 C 65.492 274.661 66.697 274.571 67.79 274.958 L 67.79 272.958 C 67.79 272.616 68.068 272.338 68.41 272.338 L 70.31 272.338 C 70.678 272.326 70.978 272.63 70.96 272.998 Z"/>
  <path class="cls-9" d="M 79.13 278.788 C 79.13 278.788 79.13 278.998 79.13 279.338 C 79.109 279.665 78.837 279.919 78.51 279.918 L 77.87 279.918 L 78.54 280.648 C 78.754 280.887 78.754 281.249 78.54 281.488 C 77.726 282.364 76.563 282.83 75.37 282.758 C 74.591 282.769 73.821 282.598 73.12 282.258 C 72.472 281.939 71.928 281.443 71.55 280.828 C 71.182 280.201 70.992 279.485 71 278.758 C 70.99 278.037 71.18 277.327 71.55 276.708 C 71.905 276.1 72.42 275.602 73.04 275.268 C 74.334 274.607 75.866 274.607 77.16 275.268 C 77.764 275.592 78.264 276.081 78.6 276.678 C 78.96 277.322 79.143 278.05 79.13 278.788 Z"/>
  <path class="cls-9" d="M 83.22 282.678 L 85.12 282.678 C 85.464 282.673 85.74 282.392 85.74 282.048 L 85.74 278.808 C 85.712 278.489 85.805 278.172 86 277.918 C 86.181 277.736 86.434 277.644 86.69 277.668 C 86.882 277.642 87.075 277.709 87.21 277.848 C 87.353 278.067 87.417 278.328 87.39 278.588 L 87.39 282.048 C 87.39 282.396 87.672 282.678 88.02 282.678 L 89.96 282.678 C 90.304 282.673 90.58 282.392 90.58 282.048 L 90.58 278.298 C 90.643 277.334 90.306 276.387 89.65 275.678 C 89 275.067 88.131 274.743 87.24 274.778 C 86.741 274.774 86.245 274.866 85.78 275.048 L 85.58 275.128 C 85.46 274.966 85.271 274.87 85.07 274.868 L 83.22 274.868 C 82.876 274.873 82.6 275.154 82.6 275.498 L 82.6 282.048 C 82.6 282.392 82.876 282.673 83.22 282.678 Z"/>
  <path class="cls-9" d="M 129.15 274.878 C 129.628 274.571 129.909 274.036 129.89 273.468 C 129.894 273.011 129.697 272.576 129.35 272.278 C 128.61 271.666 127.54 271.666 126.8 272.278 C 126.088 272.932 126.088 274.054 126.8 274.708 C 126.86 274.766 126.927 274.817 127 274.858 C 126.712 274.915 126.504 275.165 126.5 275.458 L 126.5 279.378 C 126.423 279.043 126.261 278.733 126.03 278.478 C 125.803 278.239 125.536 278.043 125.24 277.898 C 125.404 277.84 125.539 277.722 125.62 277.568 L 126.25 276.208 C 126.382 275.917 126.274 275.573 126 275.408 C 125.589 275.175 125.143 275.01 124.68 274.918 C 123.566 274.647 122.398 274.696 121.31 275.058 C 120.785 275.261 120.327 275.607 119.99 276.058 C 119.669 276.484 119.497 277.004 119.5 277.538 C 119.47 278.115 119.672 278.68 120.06 279.108 C 120.191 279.245 120.335 279.369 120.49 279.478 L 120.43 279.478 C 120.26 279.529 120.119 279.649 120.04 279.808 C 120.018 279.327 119.831 278.868 119.51 278.508 C 119.283 278.269 119.016 278.073 118.72 277.928 L 118.77 277.928 C 118.934 277.87 119.069 277.752 119.15 277.598 L 119.78 276.238 C 119.917 275.947 119.808 275.599 119.53 275.438 C 119.12 275.204 118.674 275.038 118.21 274.948 C 117.096 274.677 115.928 274.726 114.84 275.088 C 114.315 275.291 113.857 275.637 113.52 276.088 C 113.312 276.363 113.169 276.681 113.1 277.018 C 113.063 276.922 113.019 276.828 112.97 276.738 C 112.624 276.129 112.111 275.632 111.49 275.308 C 110.197 274.642 108.663 274.642 107.37 275.308 C 106.789 275.634 106.302 276.106 105.96 276.678 C 105.671 276.094 105.21 275.613 104.64 275.298 C 103.292 274.628 101.708 274.628 100.36 275.298 C 99.742 275.618 99.218 276.094 98.84 276.678 C 98.714 276.894 98.61 277.122 98.53 277.358 C 98.451 277.12 98.35 276.889 98.23 276.668 C 97.882 276.061 97.369 275.565 96.75 275.238 C 95.46 274.577 93.93 274.577 92.64 275.238 C 92.015 275.568 91.496 276.067 91.14 276.678 C 90.779 277.3 90.592 278.009 90.6 278.728 C 90.588 279.456 90.779 280.172 91.15 280.798 C 91.528 281.413 92.072 281.909 92.72 282.228 C 93.417 282.569 94.184 282.74 94.96 282.728 C 96.157 282.803 97.324 282.337 98.14 281.458 C 98.349 281.217 98.349 280.859 98.14 280.618 L 97.46 279.888 L 98.1 279.888 C 98.217 279.885 98.331 279.851 98.43 279.788 C 98.519 280.141 98.66 280.478 98.85 280.788 C 99.229 281.395 99.765 281.889 100.4 282.218 C 101.073 282.555 101.817 282.727 102.57 282.718 C 103.31 282.735 104.042 282.556 104.69 282.198 C 105.229 281.887 105.67 281.429 105.96 280.878 C 106.333 281.47 106.863 281.948 107.49 282.258 C 108.187 282.599 108.954 282.77 109.73 282.758 C 110.927 282.833 112.094 282.367 112.91 281.488 C 112.91 281.488 112.91 281.488 112.91 281.488 C 112.917 281.682 113.018 281.861 113.18 281.968 C 113.62 282.243 114.104 282.442 114.61 282.558 C 115.181 282.707 115.77 282.781 116.36 282.778 C 116.999 282.79 117.636 282.688 118.24 282.478 C 118.691 282.313 119.096 282.042 119.42 281.688 C 119.467 281.802 119.547 281.9 119.65 281.968 C 120.087 282.243 120.567 282.442 121.07 282.558 C 121.645 282.707 122.236 282.781 122.83 282.778 C 123.469 282.79 124.106 282.688 124.71 282.478 C 125.235 282.295 125.699 281.969 126.05 281.538 C 126.247 281.283 126.39 280.99 126.47 280.678 L 126.47 282.058 C 126.47 282.4 126.748 282.678 127.09 282.678 L 128.99 282.678 C 129.334 282.678 129.615 282.402 129.62 282.058 L 129.62 275.478 C 129.616 275.195 129.424 274.95 129.15 274.878 Z M 105.52 279.778 L 104.32 279.128 C 104.022 278.958 103.643 279.066 103.48 279.368 C 103.313 279.729 102.948 279.957 102.55 279.948 C 102.257 279.959 101.972 279.851 101.76 279.648 C 101.546 279.403 101.438 279.083 101.46 278.758 C 101.437 278.436 101.545 278.119 101.76 277.878 C 101.964 277.663 102.254 277.549 102.55 277.568 C 102.948 277.559 103.313 277.787 103.48 278.148 C 103.647 278.444 104.018 278.555 104.32 278.398 L 105.52 277.748 C 105.365 278.406 105.365 279.09 105.52 279.748 L 105.52 279.778 Z M 114.02 279.468 C 113.848 279.516 113.705 279.636 113.63 279.798 L 113.08 280.988 C 113.068 280.876 113.026 280.769 112.96 280.678 L 112.28 279.948 L 112.92 279.948 C 113.249 279.949 113.524 279.696 113.55 279.368 C 113.55 279.198 113.55 279.068 113.55 278.968 C 113.578 279.019 113.611 279.066 113.65 279.108 C 113.781 279.245 113.925 279.369 114.08 279.478 L 114.02 279.468 Z M 117.02 277.468 L 116.88 277.468 C 117.222 277.474 117.56 277.538 117.88 277.658 L 117.02 277.468 Z M 123.48 277.468 L 123.34 277.468 C 123.682 277.474 124.02 277.538 124.34 277.658 C 124.08 277.578 123.79 277.528 123.47 277.468 L 123.48 277.468 Z"/>
  <path class="cls-9" d="M 138.1 272.998 L 138.1 281.998 C 138.095 282.342 137.814 282.618 137.47 282.618 L 135.66 282.618 C 135.474 282.624 135.296 282.543 135.18 282.398 C 134.686 282.618 134.15 282.727 133.61 282.718 C 132.912 282.732 132.222 282.563 131.61 282.228 C 131.011 281.895 130.518 281.399 130.19 280.798 C 129.524 279.491 129.524 277.945 130.19 276.638 C 130.521 276.038 131.013 275.543 131.61 275.208 C 132.632 274.661 133.837 274.571 134.93 274.958 L 134.93 272.958 C 134.93 272.616 135.208 272.338 135.55 272.338 L 137.45 272.338 C 137.818 272.326 138.118 272.63 138.1 272.998 Z"/>
  <path class="cls-9" d="M 145.65 278.298 L 145.65 282.038 C 145.65 282.38 145.372 282.658 145.03 282.658 L 143.25 282.658 C 143.073 282.657 142.903 282.585 142.78 282.458 C 142.299 282.67 141.776 282.773 141.25 282.758 C 140.71 282.77 140.174 282.665 139.68 282.448 C 139.227 282.248 138.842 281.922 138.57 281.508 C 138.31 281.103 138.174 280.63 138.18 280.148 C 138.157 279.391 138.504 278.671 139.11 278.218 L 139.39 278.038 C 139.297 277.978 139.221 277.896 139.17 277.798 L 138.49 276.478 C 138.351 276.201 138.431 275.863 138.68 275.678 C 139.131 275.369 139.632 275.139 140.16 274.998 C 140.717 274.847 141.292 274.769 141.87 274.768 C 142.864 274.709 143.845 275.023 144.62 275.648 C 145.339 276.335 145.716 277.306 145.65 278.298 Z"/>
  <path class="cls-9" d="M 154.12 272.998 L 154.12 281.998 C 154.115 282.342 153.834 282.618 153.49 282.618 L 151.68 282.618 C 151.492 282.621 151.312 282.541 151.19 282.398 C 150.7 282.618 150.167 282.727 149.63 282.718 C 148.932 282.732 148.242 282.563 147.63 282.228 C 147.031 281.895 146.538 281.399 146.21 280.798 C 145.544 279.491 145.544 277.945 146.21 276.638 C 146.541 276.038 147.033 275.543 147.63 275.208 C 148.649 274.662 149.851 274.571 150.94 274.958 L 150.94 272.958 C 150.945 272.614 151.226 272.338 151.57 272.338 L 153.47 272.338 C 153.838 272.326 154.138 272.63 154.12 272.998 Z"/>
  <path class="cls-9" d="M 162.29 278.788 C 162.29 278.788 162.29 278.998 162.29 279.348 C 162.259 279.669 161.992 279.914 161.67 279.918 L 160.96 279.918 L 161.63 280.648 C 161.844 280.887 161.844 281.249 161.63 281.488 C 160.816 282.364 159.653 282.83 158.46 282.758 C 157.681 282.769 156.911 282.598 156.21 282.258 C 155.563 281.942 155.021 281.445 154.65 280.828 C 153.91 279.554 153.91 277.982 154.65 276.708 C 155.002 276.098 155.518 275.599 156.14 275.268 C 157.434 274.607 158.966 274.607 160.26 275.268 C 160.886 275.582 161.407 276.072 161.76 276.678 C 162.12 277.322 162.303 278.05 162.29 278.788 Z"/>
  <path class="cls-9" d="M 11.53 287.678 L 11.53 289.678 C 10.44 289.288 9.235 289.382 8.22 289.938 C 7.617 290.261 7.123 290.755 6.8 291.358 C 6.121 292.665 6.121 294.221 6.8 295.528 C 7.128 296.124 7.616 296.616 8.21 296.948 C 8.824 297.28 9.512 297.449 10.21 297.438 C 10.744 297.449 11.274 297.339 11.76 297.118 C 11.881 297.263 12.061 297.348 12.25 297.348 L 14.06 297.348 C 14.402 297.348 14.68 297.07 14.68 296.728 L 14.68 287.728 C 14.68 287.384 14.404 287.103 14.06 287.098 L 12.16 287.098 C 11.831 287.097 11.556 287.35 11.53 287.678 Z"/>
  <path class="cls-9" d="M 22.85 293.398 C 22.85 293.398 22.85 293.618 22.85 293.958 C 22.829 294.285 22.557 294.539 22.23 294.538 L 21.59 294.538 L 22.26 295.268 C 22.477 295.502 22.477 295.864 22.26 296.098 C 21.448 296.977 20.285 297.447 19.09 297.378 C 18.311 297.389 17.541 297.218 16.84 296.878 C 16.192 296.558 15.65 296.058 15.28 295.438 C 14.904 294.817 14.71 294.104 14.72 293.378 C 14.715 292.658 14.905 291.949 15.27 291.328 C 15.622 290.718 16.138 290.219 16.76 289.888 C 18.053 289.222 19.587 289.222 20.88 289.888 C 21.498 290.213 22.009 290.709 22.35 291.318 C 22.697 291.955 22.869 292.673 22.85 293.398 Z"/>
  <path class="cls-9" d="M 39.13 293.398 C 39.13 293.398 39.13 293.618 39.13 293.958 C 39.104 294.282 38.835 294.534 38.51 294.538 L 37.87 294.538 L 38.54 295.268 C 38.748 295.506 38.748 295.86 38.54 296.098 C 37.726 296.98 36.558 297.45 35.36 297.378 C 34.584 297.39 33.817 297.219 33.12 296.878 C 32.471 296.556 31.927 296.056 31.55 295.438 C 31.17 294.818 30.966 294.106 30.96 293.378 C 30.961 293.041 31.001 292.705 31.08 292.378 L 30.95 292.378 L 30.57 292.378 C 30.264 292.354 29.961 292.455 29.73 292.658 C 29.524 292.918 29.427 293.248 29.46 293.578 L 29.46 296.678 C 29.455 297.022 29.174 297.298 28.83 297.298 L 26.96 297.298 C 26.618 297.298 26.34 297.02 26.34 296.678 L 26.34 290.118 C 26.34 289.776 26.618 289.498 26.96 289.498 L 28.76 289.498 C 28.965 289.495 29.157 289.597 29.27 289.768 L 29.43 289.688 C 29.933 289.49 30.47 289.392 31.01 289.398 C 31.358 289.398 31.64 289.68 31.64 290.028 L 31.64 291.188 C 31.984 290.654 32.454 290.215 33.01 289.908 C 34.303 289.242 35.837 289.242 37.13 289.908 C 37.746 290.236 38.255 290.732 38.6 291.338 C 38.954 291.966 39.137 292.677 39.13 293.398 Z"/>
  <path class="cls-9" d="M 54.49 292.918 L 54.49 296.678 C 54.485 297.022 54.204 297.298 53.86 297.298 L 52.08 297.298 C 51.906 297.296 51.74 297.224 51.62 297.098 C 51.139 297.31 50.616 297.413 50.09 297.398 C 49.551 297.405 49.016 297.3 48.52 297.088 C 48.067 296.888 47.682 296.562 47.41 296.148 C 47.254 295.9 47.146 295.625 47.09 295.338 L 47.03 295.478 C 46.696 296.073 46.205 296.564 45.61 296.898 C 44.59 297.452 43.383 297.546 42.29 297.158 L 42.29 299.038 C 42.29 299.38 42.012 299.658 41.67 299.658 L 39.77 299.658 C 39.426 299.658 39.145 299.382 39.14 299.038 L 39.14 290.118 C 39.145 289.774 39.426 289.498 39.77 289.498 L 41.58 289.498 C 41.769 289.498 41.949 289.583 42.07 289.728 C 43.214 289.239 44.518 289.302 45.61 289.898 C 46.205 290.232 46.696 290.723 47.03 291.318 C 47.352 291.917 47.521 292.587 47.52 293.268 C 47.648 293.113 47.792 292.973 47.95 292.848 L 48.23 292.668 C 48.135 292.612 48.058 292.528 48.01 292.428 L 47.33 291.098 C 47.183 290.825 47.265 290.485 47.52 290.308 C 47.97 289.997 48.471 289.767 49 289.628 C 49.557 289.475 50.132 289.398 50.71 289.398 C 51.704 289.339 52.685 289.653 53.46 290.278 C 54.171 290.966 54.547 291.93 54.49 292.918 Z"/>
  <path class="cls-9" d="M 71.14 295.558 C 71.139 295.774 71.112 295.989 71.06 296.198 C 70.982 296.479 70.882 296.753 70.76 297.018 L 70.07 298.758 C 69.979 298.999 69.748 299.158 69.49 299.158 L 68.29 299.158 C 68.093 299.159 67.908 299.066 67.79 298.908 C 67.671 298.751 67.63 298.548 67.68 298.358 L 68.1 296.868 C 67.993 296.768 67.896 296.657 67.81 296.538 C 67.626 296.238 67.532 295.89 67.54 295.538 C 67.535 295.465 67.535 295.391 67.54 295.318 L 67.54 295.418 C 67.162 296.042 66.614 296.545 65.96 296.868 C 64.611 297.547 63.019 297.547 61.67 296.868 C 60.366 296.199 59.558 294.844 59.59 293.378 C 59.59 293.041 59.631 292.705 59.71 292.378 L 59.58 292.378 L 59.2 292.378 C 58.894 292.354 58.591 292.455 58.36 292.658 C 58.154 292.918 58.057 293.248 58.09 293.578 L 58.09 296.678 C 58.085 297.022 57.804 297.298 57.46 297.298 L 55.56 297.298 C 55.225 297.287 54.96 297.013 54.96 296.678 L 54.96 290.118 C 54.96 289.776 55.238 289.498 55.58 289.498 L 57.4 289.498 C 57.605 289.495 57.797 289.597 57.91 289.768 L 58.07 289.688 C 58.573 289.489 59.109 289.39 59.65 289.398 C 59.994 289.403 60.27 289.684 60.27 290.028 L 60.27 291.188 C 60.632 290.649 61.119 290.206 61.69 289.898 C 63.043 289.233 64.627 289.233 65.98 289.898 C 66.608 290.23 67.136 290.724 67.51 291.328 C 67.878 291.955 68.068 292.671 68.06 293.398 C 68.057 293.752 68.014 294.104 67.93 294.448 C 67.968 294.385 68.015 294.327 68.07 294.278 C 68.794 293.623 69.896 293.623 70.62 294.278 C 70.961 294.616 71.148 295.078 71.14 295.558 Z"/>
  <path class="cls-9" d="M 88.51 291.308 C 88.131 290.701 87.595 290.207 86.96 289.878 C 86.618 289.704 86.255 289.576 85.88 289.498 L 87.77 287.998 C 87.976 287.829 88.055 287.55 87.97 287.298 C 87.879 287.049 87.645 286.883 87.38 286.878 L 85.38 286.878 C 85.208 286.876 85.044 286.949 84.93 287.078 L 83.28 288.828 C 83.108 289.011 83.061 289.278 83.16 289.508 C 83.195 289.559 83.235 289.606 83.28 289.648 C 83.088 289.71 82.9 289.787 82.72 289.878 C 82.092 290.21 81.564 290.704 81.19 291.308 C 80.866 291.858 80.684 292.48 80.66 293.118 C 80.434 292.879 80.166 292.682 79.87 292.538 L 79.92 292.538 C 80.084 292.48 80.219 292.362 80.3 292.208 L 80.93 290.848 C 81.067 290.557 80.958 290.209 80.68 290.048 C 80.269 289.815 79.823 289.65 79.36 289.558 C 78.238 289.275 77.059 289.316 75.96 289.678 C 75.432 289.875 74.973 290.223 74.64 290.678 C 74.319 291.101 74.147 291.617 74.15 292.148 C 74.122 292.728 74.323 293.295 74.71 293.728 C 74.839 293.867 74.983 293.991 75.14 294.098 L 75.08 294.098 C 74.907 294.15 74.765 294.274 74.69 294.438 L 74.05 295.798 C 73.92 296.082 74.018 296.418 74.28 296.588 C 74.722 296.861 75.205 297.06 75.71 297.178 C 76.282 297.322 76.87 297.396 77.46 297.398 C 78.099 297.41 78.736 297.308 79.34 297.098 C 79.865 296.915 80.329 296.589 80.68 296.158 C 80.872 295.908 81.011 295.623 81.09 295.318 C 81.107 295.367 81.131 295.415 81.16 295.458 C 81.528 296.067 82.057 296.562 82.69 296.888 C 83.353 297.233 84.092 297.408 84.84 297.398 C 85.585 297.41 86.321 297.234 86.98 296.888 C 87.613 296.562 88.142 296.067 88.51 295.458 C 88.876 294.834 89.066 294.122 89.06 293.398 C 89.072 292.664 88.882 291.941 88.51 291.308 Z M 78.06 292.088 L 77.92 292.088 C 78.262 292.094 78.6 292.158 78.92 292.278 C 78.67 292.198 78.38 292.138 78.06 292.088 Z"/>
  <path class="cls-9" d="M 119.9 290.258 C 119.12 289.635 118.137 289.322 117.14 289.378 C 116.566 289.378 115.994 289.455 115.44 289.608 C 114.91 289.745 114.409 289.975 113.96 290.288 C 113.749 290.435 113.653 290.699 113.72 290.948 C 113.435 290.505 113.043 290.14 112.58 289.888 C 111.232 289.218 109.648 289.218 108.3 289.888 C 107.66 290.21 107.123 290.706 106.75 291.318 C 106.419 291.866 106.233 292.489 106.21 293.128 C 105.984 292.889 105.716 292.692 105.42 292.548 L 105.47 292.548 C 105.638 292.497 105.776 292.377 105.85 292.218 L 106.48 290.868 C 106.612 290.577 106.504 290.233 106.23 290.068 C 105.819 289.835 105.373 289.67 104.91 289.578 C 103.796 289.307 102.628 289.356 101.54 289.718 C 101.012 289.915 100.553 290.263 100.22 290.718 C 100.014 290.99 99.871 291.304 99.8 291.638 L 99.66 291.368 C 99.319 290.759 98.808 290.263 98.19 289.938 C 96.897 289.272 95.363 289.272 94.07 289.938 C 93.448 290.269 92.932 290.768 92.58 291.378 C 92.219 292 92.032 292.709 92.04 293.428 C 92.027 294.153 92.217 294.866 92.59 295.488 C 92.963 296.106 93.504 296.605 94.15 296.928 C 94.851 297.268 95.621 297.439 96.4 297.428 C 97.595 297.497 98.758 297.027 99.57 296.148 C 99.577 296.342 99.678 296.521 99.84 296.628 C 100.28 296.897 100.759 297.096 101.26 297.218 C 101.836 297.362 102.427 297.436 103.02 297.438 C 103.659 297.45 104.296 297.348 104.9 297.138 C 105.426 296.952 105.89 296.623 106.24 296.188 C 106.435 295.941 106.575 295.654 106.65 295.348 C 106.65 295.398 106.7 295.458 106.73 295.508 C 107.106 296.118 107.642 296.613 108.28 296.938 C 108.953 297.276 109.697 297.448 110.45 297.438 C 111.186 297.45 111.913 297.271 112.56 296.918 C 113.009 296.676 113.396 296.334 113.69 295.918 C 113.723 296.022 113.767 296.123 113.82 296.218 C 114.095 296.629 114.479 296.955 114.93 297.158 C 115.426 297.37 115.961 297.475 116.5 297.468 C 117.029 297.482 117.555 297.379 118.04 297.168 C 118.159 297.295 118.326 297.368 118.5 297.368 L 120.28 297.368 C 120.675 297.409 121.007 297.073 120.96 296.678 L 120.96 292.938 C 121.023 291.931 120.634 290.949 119.9 290.258 Z M 100.66 294.078 C 100.485 294.127 100.342 294.252 100.27 294.418 L 99.71 295.608 C 99.699 295.481 99.646 295.362 99.56 295.268 L 98.89 294.538 L 99.53 294.538 C 99.856 294.544 100.129 294.293 100.15 293.968 C 100.157 293.831 100.157 293.695 100.15 293.558 C 100.184 293.607 100.221 293.653 100.26 293.698 C 100.389 293.837 100.533 293.961 100.69 294.068 L 100.66 294.078 Z M 103.66 292.078 L 103.52 292.078 C 103.862 292.085 104.2 292.149 104.52 292.268 C 104.25 292.198 103.96 292.138 103.64 292.088 L 103.66 292.078 Z M 114.4 292.818 C 113.892 293.204 113.566 293.783 113.5 294.418 L 112.25 293.728 C 111.945 293.57 111.571 293.68 111.4 293.978 C 111.234 294.336 110.874 294.563 110.48 294.558 C 110.185 294.58 109.896 294.47 109.69 294.258 C 109.276 293.737 109.276 292.999 109.69 292.478 C 109.896 292.266 110.185 292.156 110.48 292.178 C 110.878 292.169 111.243 292.397 111.41 292.758 C 111.573 293.059 111.949 293.171 112.25 293.008 L 113.72 292.208 C 113.955 292.078 114.081 291.812 114.03 291.548 L 114.46 292.398 C 114.511 292.496 114.587 292.578 114.68 292.638 L 114.4 292.818 Z"/>
  <path class="cls-9" d="M 126.82 297.288 L 128.72 297.288 C 129.064 297.283 129.34 297.002 129.34 296.658 L 129.34 292.908 C 129.404 291.942 129.063 290.993 128.4 290.288 C 127.756 289.673 126.89 289.345 126 289.378 C 125.5 289.375 125.004 289.47 124.54 289.658 L 124.34 289.738 C 124.22 289.576 124.031 289.48 123.83 289.478 L 122.02 289.478 C 121.672 289.478 121.39 289.76 121.39 290.108 L 121.39 296.678 C 121.39 297.026 121.672 297.308 122.02 297.308 L 123.96 297.308 C 124.304 297.303 124.58 297.022 124.58 296.678 L 124.58 293.438 C 124.552 293.121 124.641 292.804 124.83 292.548 C 125.016 292.367 125.271 292.275 125.53 292.298 C 125.72 292.274 125.911 292.336 126.05 292.468 C 126.192 292.691 126.255 292.955 126.23 293.218 L 126.23 296.678 C 126.24 297.003 126.495 297.267 126.82 297.288 Z"/>
  <path class="cls-9" d="M 143.41 290.258 C 142.63 289.635 141.647 289.322 140.65 289.378 C 140.076 289.378 139.504 289.455 138.95 289.608 C 138.42 289.745 137.919 289.975 137.47 290.288 C 137.215 290.464 137.13 290.802 137.27 291.078 L 137.95 292.408 C 138.001 292.506 138.077 292.588 138.17 292.648 L 137.89 292.828 C 137.761 292.928 137.644 293.042 137.54 293.168 C 137.523 292.511 137.344 291.869 137.02 291.298 C 136.679 290.689 136.168 290.193 135.55 289.868 C 134.257 289.202 132.723 289.202 131.43 289.868 C 130.808 290.199 130.292 290.698 129.94 291.308 C 129.579 291.93 129.392 292.639 129.4 293.358 C 129.387 294.083 129.577 294.796 129.95 295.418 C 130.323 296.036 130.864 296.535 131.51 296.858 C 132.211 297.198 132.981 297.369 133.76 297.358 C 134.958 297.43 136.126 296.96 136.94 296.078 C 137.086 295.911 137.132 295.678 137.06 295.468 C 137.123 295.695 137.221 295.911 137.35 296.108 C 137.625 296.519 138.009 296.845 138.46 297.048 C 138.956 297.26 139.491 297.365 140.03 297.358 C 140.559 297.372 141.085 297.269 141.57 297.058 C 141.689 297.185 141.856 297.258 142.03 297.258 L 143.81 297.258 C 144.152 297.258 144.43 296.98 144.43 296.638 L 144.43 292.898 C 144.491 291.911 144.119 290.947 143.41 290.258 Z M 136.92 295.258 L 136.25 294.528 L 136.89 294.528 L 136.98 294.528 C 136.98 294.608 136.98 294.688 136.98 294.778 C 136.979 295.014 137.009 295.25 137.07 295.478 C 137.043 295.403 137.006 295.333 136.96 295.268 L 136.92 295.258 Z"/>
  <path class="cls-9" d="M 148.02 289.678 L 147.85 289.748 C 147.735 289.58 147.544 289.479 147.34 289.478 L 145.53 289.478 C 145.182 289.478 144.9 289.76 144.9 290.108 L 144.9 296.678 C 144.9 297.026 145.182 297.308 145.53 297.308 L 147.43 297.308 C 147.774 297.303 148.05 297.022 148.05 296.678 L 148.05 293.588 C 148.014 293.253 148.115 292.918 148.33 292.658 C 148.56 292.453 148.863 292.352 149.17 292.378 L 149.55 292.378 C 149.722 292.379 149.889 292.319 150.02 292.208 C 150.15 292.09 150.222 291.923 150.22 291.748 L 150.22 289.998 C 150.22 289.65 149.938 289.368 149.59 289.368 C 149.051 289.362 148.516 289.468 148.02 289.678 Z"/>
  <path class="cls-9" d="M 161.56 293.378 C 161.566 294.102 161.376 294.814 161.01 295.438 C 160.642 296.047 160.113 296.542 159.48 296.868 C 158.821 297.216 158.085 297.391 157.34 297.378 C 156.592 297.388 155.853 297.213 155.19 296.868 C 154.557 296.542 154.028 296.047 153.66 295.438 C 152.467 293.491 153.169 290.941 155.19 289.878 C 156.543 289.213 158.127 289.213 159.48 289.878 C 160.108 290.21 160.636 290.704 161.01 291.308 C 161.378 291.935 161.568 292.651 161.56 293.378 Z"/>
  <path class="cls-9" d="M 13.08 312.578 C 12.755 313.004 12.333 313.346 11.85 313.578 C 11.362 313.792 10.833 313.901 10.3 313.898 C 9.604 313.906 8.917 313.741 8.3 313.418 C 7.644 313.038 7.047 312.563 6.53 312.008 C 5.781 311.888 5.066 311.612 4.43 311.198 C 3.747 310.756 3.19 310.147 2.81 309.428 C 1.498 307.006 2.392 303.978 4.81 302.658 C 6.497 301.798 8.493 301.798 10.18 302.658 C 10.963 303.081 11.622 303.701 12.09 304.458 C 12.555 305.241 12.797 306.137 12.79 307.048 C 12.812 308.67 12.029 310.198 10.7 311.128 C 10.915 311.049 11.107 310.919 11.26 310.748 C 11.384 310.622 11.553 310.55 11.73 310.548 C 11.909 310.556 12.076 310.639 12.19 310.778 L 13.07 311.828 C 13.241 312.047 13.245 312.354 13.08 312.578 Z"/>
  <path class="cls-9" d="M 21.76 311.558 C 21.657 311.767 21.443 311.899 21.21 311.898 L 19.09 311.898 C 18.885 311.899 18.694 311.798 18.58 311.628 L 17.12 309.518 L 16.26 309.518 L 16.26 311.268 C 16.26 311.616 15.978 311.898 15.63 311.898 L 13.63 311.898 C 13.282 311.898 13 311.616 13 311.268 L 13 302.748 C 13 302.4 13.282 302.118 13.63 302.118 L 17.32 302.118 C 18.082 302.105 18.838 302.251 19.54 302.548 C 20.177 302.822 20.72 303.278 21.1 303.858 C 21.475 304.457 21.666 305.152 21.65 305.858 C 21.669 306.566 21.474 307.263 21.09 307.858 C 20.847 308.219 20.538 308.531 20.18 308.778 L 21.69 310.958 C 21.822 311.13 21.849 311.36 21.76 311.558 Z"/>
  <path class="cls-9" d="M 49.9 302.228 L 49.9 311.228 C 49.9 311.572 49.624 311.853 49.28 311.858 L 47.46 311.858 C 47.275 311.876 47.091 311.81 46.96 311.678 C 46.469 311.907 45.932 312.02 45.39 312.008 C 44.692 312.018 44.004 311.85 43.39 311.518 C 42.793 311.183 42.301 310.688 41.97 310.088 C 41.844 309.863 41.743 309.625 41.67 309.378 C 41.592 309.618 41.488 309.85 41.36 310.068 C 40.992 310.677 40.463 311.172 39.83 311.498 C 39.171 311.844 38.435 312.02 37.69 312.008 C 36.942 312.018 36.203 311.843 35.54 311.498 C 34.972 311.198 34.49 310.757 34.14 310.218 C 34.142 310.245 34.142 310.271 34.14 310.298 C 33.673 310.867 33.076 311.317 32.4 311.608 C 31.686 311.911 30.916 312.061 30.14 312.048 C 29.217 312.062 28.305 311.842 27.49 311.408 C 26.703 310.994 26.046 310.371 25.59 309.608 C 24.671 308.004 24.671 306.032 25.59 304.428 C 26.046 303.665 26.703 303.042 27.49 302.628 C 29.016 301.837 30.815 301.764 32.4 302.428 C 33.071 302.701 33.668 303.129 34.14 303.678 C 34.355 303.934 34.329 304.314 34.08 304.538 L 32.82 305.708 C 32.568 305.921 32.196 305.908 31.96 305.678 C 31.553 305.175 30.937 304.887 30.29 304.898 C 29.904 304.887 29.521 304.976 29.18 305.158 C 28.874 305.329 28.621 305.582 28.45 305.888 C 28.091 306.584 28.091 307.412 28.45 308.108 C 28.625 308.411 28.877 308.663 29.18 308.838 C 29.521 309.02 29.904 309.109 30.29 309.098 C 30.938 309.105 31.554 308.814 31.96 308.308 C 32.071 308.178 32.23 308.099 32.4 308.088 C 32.57 308.079 32.737 308.141 32.86 308.258 L 33.68 309.018 C 33.411 307.969 33.562 306.857 34.1 305.918 C 34.468 305.309 34.997 304.814 35.63 304.488 C 36.982 303.818 38.568 303.818 39.92 304.488 C 40.553 304.814 41.082 305.309 41.45 305.918 C 41.578 306.136 41.682 306.368 41.76 306.608 C 41.835 306.362 41.935 306.124 42.06 305.898 C 42.389 305.299 42.881 304.807 43.48 304.478 C 44.499 303.933 45.699 303.839 46.79 304.218 L 46.79 302.218 C 46.795 301.874 47.076 301.598 47.42 301.598 L 49.32 301.598 C 49.651 301.619 49.906 301.897 49.9 302.228 Z"/>
  <path class="cls-9" d="M 58.07 308.018 C 58.07 308.018 58.07 308.228 58.07 308.578 C 58.044 308.906 57.769 309.159 57.44 309.158 L 56.8 309.158 L 57.48 309.888 C 57.688 310.126 57.688 310.48 57.48 310.718 C 56.666 311.6 55.498 312.07 54.3 311.998 C 53.523 312.012 52.754 311.837 52.06 311.488 C 51.41 311.172 50.865 310.676 50.49 310.058 C 50.119 309.436 49.928 308.722 49.94 307.998 C 49.931 307.275 50.117 306.563 50.48 305.938 C 50.839 305.332 51.358 304.837 51.98 304.508 C 53.27 303.847 54.8 303.847 56.09 304.508 C 56.706 304.838 57.219 305.333 57.57 305.938 C 57.914 306.576 58.087 307.293 58.07 308.018 Z"/>
  <path class="cls-9" d="M 68.59 307.528 L 68.59 311.268 C 68.59 311.616 68.308 311.898 67.96 311.898 L 66.18 311.898 C 66.004 311.898 65.836 311.821 65.72 311.688 C 65.239 311.903 64.717 312.009 64.19 311.998 C 63.646 312.007 63.107 311.898 62.61 311.678 C 62.16 311.479 61.775 311.156 61.5 310.748 C 61.239 310.339 61.104 309.863 61.11 309.378 C 61.096 308.621 61.445 307.903 62.05 307.448 C 62.134 307.379 62.224 307.319 62.32 307.268 C 62.23 307.208 62.157 307.125 62.11 307.028 L 61.42 305.678 C 61.279 305.399 61.364 305.058 61.62 304.878 C 62.07 304.57 62.571 304.343 63.1 304.208 C 63.656 304.051 64.232 303.974 64.81 303.978 C 65.804 303.919 66.785 304.233 67.56 304.858 C 68.282 305.552 68.659 306.529 68.59 307.528 Z"/>
  <path class="cls-9" d="M 79.71 302.678 C 79.714 302.221 79.517 301.786 79.17 301.488 C 78.43 300.876 77.36 300.876 76.62 301.488 C 75.921 302.147 75.921 303.259 76.62 303.918 C 76.68 303.976 76.747 304.027 76.82 304.068 C 76.532 304.125 76.324 304.375 76.32 304.668 L 76.32 305.808 C 76.032 305.238 75.579 304.768 75.02 304.458 C 73.672 303.788 72.088 303.788 70.74 304.458 C 70.102 304.783 69.566 305.278 69.19 305.888 C 68.444 307.167 68.444 308.749 69.19 310.028 C 69.563 310.64 70.1 311.136 70.74 311.458 C 71.413 311.796 72.157 311.968 72.91 311.958 C 73.65 311.975 74.382 311.796 75.03 311.438 C 75.58 311.13 76.029 310.667 76.32 310.108 L 76.32 311.238 C 76.32 311.58 76.598 311.858 76.94 311.858 L 78.84 311.858 C 79.184 311.858 79.465 311.582 79.47 311.238 L 79.47 304.678 C 79.461 304.383 79.249 304.134 78.96 304.078 L 79.18 303.918 C 79.52 303.595 79.712 303.147 79.71 302.678 Z M 76.16 309.138 L 74.68 308.338 C 74.382 308.168 74.003 308.276 73.84 308.578 C 73.673 308.939 73.308 309.167 72.91 309.158 C 72.617 309.169 72.332 309.061 72.12 308.858 C 71.906 308.613 71.798 308.293 71.82 307.968 C 71.797 307.646 71.905 307.329 72.12 307.088 C 72.324 306.873 72.614 306.759 72.91 306.778 C 73.31 306.771 73.676 307.003 73.84 307.368 C 74.01 307.661 74.381 307.767 74.68 307.608 L 76.15 306.818 C 76.219 306.779 76.28 306.728 76.33 306.668 L 76.33 309.278 L 76.16 309.138 Z"/>
  <path class="cls-9" d="M 88.96 307.058 C 89.099 307.286 89.162 307.552 89.14 307.818 L 89.14 311.278 C 89.14 311.62 89.418 311.898 89.76 311.898 L 91.66 311.898 C 92.004 311.898 92.285 311.622 92.29 311.278 L 92.29 307.528 C 92.353 306.568 92.025 305.622 91.38 304.908 C 90.737 304.29 89.871 303.962 88.98 303.998 C 88.425 303.993 87.875 304.109 87.37 304.338 C 87.114 304.457 86.873 304.605 86.65 304.778 C 86.448 304.605 86.227 304.458 85.99 304.338 C 85.064 303.916 84.005 303.891 83.06 304.268 L 82.9 304.338 C 82.778 304.186 82.594 304.098 82.4 304.098 L 80.62 304.098 C 80.279 304.081 79.987 304.338 79.96 304.678 L 79.96 311.238 C 79.965 311.582 80.246 311.858 80.59 311.858 L 82.49 311.858 C 82.832 311.858 83.11 311.58 83.11 311.238 L 83.11 307.948 C 83.087 307.64 83.168 307.334 83.34 307.078 C 83.494 306.92 83.71 306.84 83.93 306.858 C 84.19 306.858 84.54 306.858 84.54 307.778 L 84.54 311.238 C 84.545 311.582 84.826 311.858 85.17 311.858 L 87.07 311.858 C 87.412 311.858 87.69 311.58 87.69 311.238 L 87.69 307.948 C 87.662 307.64 87.743 307.332 87.92 307.078 C 88.079 306.921 88.298 306.841 88.52 306.858 C 88.82 306.898 88.96 306.978 88.96 307.058 Z"/>
  <path class="cls-9" d="M 99.82 307.528 L 99.82 311.268 C 99.82 311.616 99.538 311.898 99.19 311.898 L 97.41 311.898 C 97.236 311.891 97.072 311.811 96.96 311.678 C 96.48 311.894 95.957 312 95.43 311.988 C 94.89 311.997 94.354 311.888 93.86 311.668 C 92.939 311.276 92.343 310.369 92.35 309.368 C 92.336 308.611 92.685 307.893 93.29 307.438 C 93.375 307.367 93.47 307.306 93.57 307.258 C 93.477 307.198 93.401 307.116 93.35 307.018 L 92.66 305.678 C 92.521 305.401 92.601 305.063 92.85 304.878 C 93.301 304.572 93.802 304.345 94.33 304.208 C 94.886 304.051 95.462 303.974 96.04 303.978 C 97.034 303.919 98.015 304.233 98.79 304.858 C 99.512 305.552 99.889 306.529 99.82 307.528 Z"/>
  <path class="cls-9" d="M 119.08 307.528 L 119.08 311.268 C 119.08 311.616 118.798 311.898 118.45 311.898 L 116.67 311.898 C 116.494 311.898 116.326 311.821 116.21 311.688 C 115.73 311.904 115.207 312.01 114.68 311.998 C 114.14 312.007 113.604 311.898 113.11 311.678 C 112.363 311.387 111.821 310.728 111.68 309.938 L 111.62 310.068 C 111.283 310.66 110.792 311.151 110.2 311.488 C 109.18 312.042 107.973 312.136 106.88 311.748 L 106.88 313.678 C 106.88 314.02 106.602 314.298 106.26 314.298 L 104.36 314.298 C 104.016 314.298 103.735 314.022 103.73 313.678 L 103.73 304.678 C 103.73 304.33 104.012 304.048 104.36 304.048 L 106.17 304.048 C 106.359 304.048 106.539 304.133 106.66 304.278 C 107.806 303.798 109.108 303.865 110.2 304.458 C 110.796 304.79 111.288 305.282 111.62 305.878 C 111.939 306.476 112.11 307.141 112.12 307.818 C 112.239 307.661 112.381 307.523 112.54 307.408 C 112.624 307.339 112.714 307.279 112.81 307.228 C 112.72 307.168 112.647 307.085 112.6 306.988 L 111.96 305.678 C 111.812 305.402 111.894 305.058 112.15 304.878 C 112.6 304.57 113.101 304.343 113.63 304.208 C 114.186 304.051 114.762 303.974 115.34 303.978 C 116.334 303.919 117.315 304.233 118.09 304.858 C 118.797 305.559 119.159 306.536 119.08 307.528 Z"/>
  <path class="cls-9" d="M 131.76 307.528 L 131.76 311.268 C 131.76 311.616 131.478 311.898 131.13 311.898 L 129.35 311.898 C 129.174 311.898 129.006 311.821 128.89 311.688 C 128.41 311.904 127.887 312.01 127.36 311.998 C 126.816 312.006 126.278 311.897 125.78 311.678 C 125.33 311.479 124.945 311.156 124.67 310.748 C 124.409 310.339 124.274 309.863 124.28 309.378 C 124.266 308.621 124.615 307.903 125.22 307.448 C 125.304 307.379 125.394 307.319 125.49 307.268 C 125.4 307.208 125.327 307.125 125.28 307.028 L 124.86 306.218 L 124.86 306.378 C 124.86 306.552 124.787 306.719 124.66 306.838 C 124.53 306.95 124.361 307.007 124.19 306.998 L 123.81 306.998 C 123.506 306.976 123.205 307.073 122.97 307.268 C 122.761 307.531 122.661 307.864 122.69 308.198 L 122.69 311.288 C 122.69 311.632 122.414 311.913 122.07 311.918 L 120.17 311.918 C 119.822 311.918 119.54 311.636 119.54 311.288 L 119.54 304.678 C 119.54 304.33 119.822 304.048 120.17 304.048 L 121.96 304.048 C 122.167 304.047 122.362 304.148 122.48 304.318 L 122.64 304.248 C 123.143 304.049 123.679 303.95 124.22 303.958 C 124.562 303.958 124.84 304.236 124.84 304.578 L 124.84 304.818 C 125.272 304.531 125.748 304.318 126.25 304.188 C 126.806 304.031 127.382 303.954 127.96 303.958 C 128.954 303.899 129.935 304.213 130.71 304.838 C 131.445 305.533 131.83 306.519 131.76 307.528 Z"/>
  <path class="cls-9" d="M 142.72 307.528 L 142.72 311.268 C 142.72 311.612 142.444 311.893 142.1 311.898 L 140.32 311.898 C 140.141 311.898 139.97 311.822 139.85 311.688 C 139.37 311.904 138.847 312.01 138.32 311.998 C 137.78 312.007 137.244 311.898 136.75 311.678 C 136.298 311.482 135.912 311.159 135.64 310.748 C 135.378 310.34 135.243 309.863 135.25 309.378 C 135.232 308.623 135.578 307.904 136.18 307.448 C 136.267 307.379 136.361 307.319 136.46 307.268 C 136.367 307.208 136.291 307.126 136.24 307.028 L 135.56 305.678 C 135.421 305.401 135.501 305.063 135.75 304.878 C 136.201 304.572 136.702 304.345 137.23 304.208 C 137.786 304.052 138.362 303.974 138.94 303.978 C 139.934 303.919 140.915 304.233 141.69 304.858 C 142.412 305.552 142.789 306.529 142.72 307.528 Z"/>
  <path class="cls-9" d="M 151.58 307.998 C 151.593 308.721 151.417 309.434 151.07 310.068 C 150.739 310.668 150.247 311.163 149.65 311.498 C 149.038 311.837 148.349 312.009 147.65 311.998 C 147.105 312.01 146.565 311.897 146.07 311.668 C 145.953 311.813 145.776 311.897 145.59 311.898 L 143.77 311.898 C 143.426 311.893 143.15 311.612 143.15 311.268 L 143.15 302.268 C 143.15 301.926 143.428 301.648 143.77 301.648 L 145.67 301.648 C 146.014 301.648 146.295 301.924 146.3 302.268 L 146.3 304.268 C 147.389 303.871 148.596 303.966 149.61 304.528 C 150.209 304.857 150.701 305.349 151.03 305.948 C 151.388 306.572 151.577 307.279 151.58 307.998 Z"/>
  <path class="cls-9" d="M 160.18 302.678 C 160.182 302.219 159.985 301.781 159.64 301.478 C 158.9 300.866 157.83 300.866 157.09 301.478 C 156.75 301.788 156.558 302.228 156.56 302.688 C 156.56 303.151 156.752 303.592 157.09 303.908 L 157.3 304.058 C 157.115 304.093 156.956 304.211 156.87 304.378 C 156.792 304.121 156.558 303.944 156.29 303.938 C 155.749 303.93 155.213 304.029 154.71 304.228 L 154.55 304.308 C 154.43 304.139 154.237 304.039 154.03 304.038 L 152.22 304.038 C 151.876 304.038 151.595 304.314 151.59 304.658 L 151.59 311.218 C 151.595 311.562 151.876 311.838 152.22 311.838 L 154.12 311.838 C 154.462 311.838 154.74 311.56 154.74 311.218 L 154.74 308.118 C 154.71 307.787 154.811 307.457 155.02 307.198 C 155.25 306.993 155.553 306.892 155.86 306.918 L 156.24 306.918 C 156.412 306.93 156.581 306.872 156.71 306.758 C 156.745 306.725 156.773 306.684 156.79 306.638 L 156.79 311.198 C 156.795 311.542 157.076 311.818 157.42 311.818 L 159.32 311.818 C 159.662 311.818 159.94 311.54 159.94 311.198 L 159.94 304.678 C 159.935 304.382 159.721 304.131 159.43 304.078 L 159.65 303.918 C 159.989 303.595 160.181 303.146 160.18 302.678 Z"/>
  <path class="cls-9" d="M 165.15 303.998 C 164.613 303.991 164.079 304.09 163.58 304.288 L 163.41 304.368 C 163.295 304.2 163.104 304.099 162.9 304.098 L 161.08 304.098 C 160.738 304.098 160.46 304.376 160.46 304.718 L 160.46 311.278 C 160.46 311.62 160.738 311.898 161.08 311.898 L 162.96 311.898 C 163.302 311.898 163.58 311.62 163.58 311.278 L 163.58 308.178 C 163.546 307.846 163.647 307.515 163.86 307.258 C 164.09 307.053 164.393 306.952 164.7 306.978 L 165.07 306.978 C 165.436 307.014 165.752 306.725 165.75 306.358 L 165.75 304.678 C 165.779 304.322 165.506 304.014 165.15 303.998 Z"/>
  <path class="cls-9" d="M 47.61 318.678 L 45.71 318.678 C 45.368 318.678 45.09 318.956 45.09 319.298 L 45.09 322.538 C 45.122 322.859 45.033 323.18 44.84 323.438 C 44.672 323.607 44.438 323.695 44.2 323.678 C 43.89 323.678 43.5 323.678 43.5 322.678 L 43.5 319.258 C 43.5 318.916 43.222 318.638 42.88 318.638 L 40.96 318.638 C 40.616 318.638 40.335 318.914 40.33 319.258 L 40.33 322.968 C 40.271 323.942 40.61 324.899 41.27 325.618 C 41.942 326.247 42.84 326.579 43.76 326.538 C 44.234 326.538 44.703 326.443 45.14 326.258 L 45.29 326.188 C 45.409 326.345 45.593 326.437 45.79 326.438 L 47.59 326.438 C 47.934 326.438 48.215 326.162 48.22 325.818 L 48.22 319.258 C 48.195 318.937 47.932 318.687 47.61 318.678 Z"/>
  <path class="cls-9" d="M 57.77 318.618 C 57.218 318.612 56.672 318.728 56.17 318.958 C 55.91 319.075 55.665 319.222 55.44 319.398 C 55.244 319.218 55.022 319.069 54.78 318.958 C 53.855 318.53 52.794 318.505 51.85 318.888 L 51.69 318.958 C 51.573 318.807 51.392 318.718 51.2 318.718 L 49.38 318.718 C 49.038 318.718 48.76 318.996 48.76 319.338 L 48.76 325.898 C 48.76 326.24 49.038 326.518 49.38 326.518 L 51.28 326.518 C 51.624 326.518 51.905 326.242 51.91 325.898 L 51.91 322.608 C 51.889 322.302 51.966 321.997 52.13 321.738 C 52.281 321.576 52.499 321.491 52.72 321.508 C 52.98 321.508 53.34 321.508 53.34 322.438 L 53.34 325.898 C 53.34 326.24 53.618 326.518 53.96 326.518 L 55.86 326.518 C 56.204 326.518 56.485 326.242 56.49 325.898 L 56.49 322.608 C 56.469 322.302 56.546 321.997 56.71 321.738 C 56.864 321.573 57.085 321.488 57.31 321.508 C 57.474 321.489 57.637 321.548 57.75 321.668 C 57.892 321.898 57.956 322.169 57.93 322.438 L 57.93 325.898 C 57.93 326.24 58.208 326.518 58.55 326.518 L 60.45 326.518 C 60.794 326.518 61.075 326.242 61.08 325.898 L 61.08 322.138 C 61.142 321.181 60.813 320.239 60.17 319.528 C 59.53 318.906 58.661 318.577 57.77 318.618 Z"/>
  <path class="cls-9" d="M 76.74 318.618 C 76.266 318.614 75.795 318.695 75.35 318.858 L 75.28 318.858 L 75.28 316.858 C 75.28 316.514 75.004 316.233 74.66 316.228 L 72.76 316.228 C 72.412 316.228 72.13 316.51 72.13 316.858 L 72.13 320.378 C 71.84 319.855 71.411 319.422 70.89 319.128 C 69.538 318.458 67.952 318.458 66.6 319.128 C 65.962 319.453 65.425 319.948 65.05 320.558 C 63.839 322.511 64.554 325.081 66.6 326.128 C 67.273 326.465 68.017 326.637 68.77 326.628 C 69.51 326.64 70.24 326.461 70.89 326.108 C 71.408 325.815 71.837 325.386 72.13 324.868 L 72.13 325.868 C 72.135 326.212 72.416 326.488 72.76 326.488 L 74.66 326.488 C 75.002 326.488 75.28 326.21 75.28 325.868 L 75.28 322.678 C 75.251 322.361 75.34 322.044 75.53 321.788 C 75.714 321.603 75.97 321.508 76.23 321.528 C 76.422 321.504 76.614 321.57 76.75 321.708 C 76.894 321.93 76.957 322.195 76.93 322.458 L 76.93 325.918 C 76.935 326.262 77.216 326.538 77.56 326.538 L 79.46 326.538 C 79.802 326.538 80.08 326.26 80.08 325.918 L 80.08 322.158 C 80.142 321.195 79.802 320.25 79.14 319.548 C 78.501 318.923 77.633 318.587 76.74 318.618 Z M 72.01 323.788 L 70.53 322.978 C 70.229 322.815 69.853 322.927 69.69 323.228 C 69.523 323.589 69.158 323.817 68.76 323.808 C 68.467 323.819 68.182 323.711 67.97 323.508 C 67.57 322.982 67.57 322.254 67.97 321.728 C 68.182 321.525 68.467 321.417 68.76 321.428 C 69.158 321.419 69.523 321.647 69.69 322.008 C 69.857 322.304 70.228 322.415 70.53 322.258 L 72 321.458 C 72.05 321.434 72.094 321.4 72.13 321.358 L 72.13 323.888 C 72.097 323.847 72.056 323.813 72.01 323.788 Z"/>
  <path class="cls-9" d="M 87.6 322.148 L 87.6 325.888 C 87.6 326.236 87.318 326.518 86.97 326.518 L 85.19 326.518 C 85.014 326.518 84.846 326.441 84.73 326.308 C 84.245 326.521 83.719 326.623 83.19 326.608 C 82.65 326.619 82.115 326.514 81.62 326.298 C 81.17 326.099 80.785 325.776 80.51 325.368 C 80.25 324.959 80.115 324.483 80.12 323.998 C 80.097 323.239 80.449 322.518 81.06 322.068 C 81.144 321.997 81.235 321.933 81.33 321.878 C 81.24 321.822 81.168 321.742 81.12 321.648 L 80.43 320.318 C 80.289 320.039 80.374 319.698 80.63 319.518 C 81.081 319.209 81.582 318.979 82.11 318.838 C 82.667 318.685 83.242 318.608 83.82 318.608 C 84.816 318.552 85.796 318.869 86.57 319.498 C 87.286 320.187 87.663 321.156 87.6 322.148 Z"/>
  <path class="cls-9" d="M 97.08 318.618 C 96.525 318.613 95.975 318.729 95.47 318.958 C 95.214 319.077 94.973 319.225 94.75 319.398 C 94.553 319.22 94.33 319.072 94.09 318.958 C 93.165 318.53 92.104 318.505 91.16 318.888 L 91 318.958 C 90.878 318.806 90.694 318.718 90.5 318.718 L 88.69 318.718 C 88.346 318.718 88.065 318.994 88.06 319.338 L 88.06 325.898 C 88.065 326.242 88.346 326.518 88.69 326.518 L 90.59 326.518 C 90.932 326.518 91.21 326.24 91.21 325.898 L 91.21 322.608 C 91.187 322.3 91.268 321.994 91.44 321.738 C 91.591 321.576 91.809 321.491 92.03 321.508 C 92.29 321.508 92.64 321.508 92.64 322.438 L 92.64 325.898 C 92.645 326.242 92.926 326.518 93.27 326.518 L 95.17 326.518 C 95.512 326.518 95.79 326.24 95.79 325.898 L 95.79 322.608 C 95.767 322.3 95.848 321.994 96.02 321.738 C 96.174 321.573 96.395 321.488 96.62 321.508 C 96.784 321.487 96.948 321.547 97.06 321.668 C 97.198 321.9 97.261 322.169 97.24 322.438 L 97.24 325.898 C 97.24 326.24 97.518 326.518 97.86 326.518 L 99.76 326.518 C 100.104 326.518 100.385 326.242 100.39 325.898 L 100.39 322.138 C 100.452 321.181 100.123 320.239 99.48 319.528 C 98.84 318.906 97.971 318.577 97.08 318.618 Z"/>
  <path class="cls-9" d="M 107.89 322.148 L 107.89 325.888 C 107.89 326.232 107.614 326.513 107.27 326.518 L 105.48 326.518 C 105.304 326.517 105.137 326.44 105.02 326.308 C 104.539 326.52 104.016 326.623 103.49 326.608 C 102.95 326.62 102.414 326.515 101.92 326.298 C 101.466 326.101 101.08 325.774 100.81 325.358 C 100.545 324.954 100.406 324.481 100.41 323.998 C 100.391 323.24 100.741 322.52 101.35 322.068 L 101.63 321.878 C 101.535 321.821 101.458 321.738 101.41 321.638 L 100.73 320.318 C 100.591 320.041 100.671 319.703 100.92 319.518 C 101.371 319.209 101.872 318.979 102.4 318.838 C 102.957 318.686 103.532 318.609 104.11 318.608 C 105.106 318.552 106.086 318.869 106.86 319.498 C 107.579 320.185 107.956 321.156 107.89 322.148 Z"/>
  <path class="cls-9" d="M 116.36 316.848 L 116.36 325.848 C 116.36 326.196 116.078 326.478 115.73 326.478 L 113.96 326.478 C 113.774 326.476 113.598 326.392 113.48 326.248 C 112.991 326.473 112.458 326.582 111.92 326.568 C 111.222 326.582 110.532 326.413 109.92 326.078 C 109.318 325.749 108.825 325.252 108.5 324.648 C 108.16 324.008 107.987 323.293 108 322.568 C 107.99 321.844 108.162 321.128 108.5 320.488 C 108.829 319.889 109.321 319.397 109.92 319.068 C 110.937 318.518 112.139 318.424 113.23 318.808 L 113.23 316.808 C 113.235 316.464 113.516 316.188 113.86 316.188 L 115.76 316.188 C 116.108 316.204 116.377 316.5 116.36 316.848 Z"/>
  <path class="cls-9" d="M 127.9 324.788 C 128.003 326.177 126.564 327.158 125.309 326.553 C 124.639 326.23 124.235 325.53 124.29 324.788 C 124.286 324.725 124.286 324.661 124.29 324.598 C 124.286 324.625 124.286 324.651 124.29 324.678 C 123.923 325.285 123.398 325.779 122.77 326.108 C 121.414 326.775 119.826 326.775 118.47 326.108 C 117.847 325.777 117.325 325.283 116.96 324.678 C 116.226 323.399 116.226 321.827 116.96 320.548 C 117.328 319.939 117.857 319.444 118.49 319.118 C 119.846 318.451 121.434 318.451 122.79 319.118 C 123.418 319.447 123.943 319.941 124.31 320.548 C 124.676 321.172 124.866 321.884 124.86 322.608 C 124.86 322.946 124.816 323.282 124.73 323.608 L 124.87 323.448 C 125.594 322.803 126.686 322.803 127.41 323.448 C 127.758 323.803 127.937 324.292 127.9 324.788 Z"/>
  <path class="cls-7" d="M 13.39 280.458 L 13.39 282.038 L 6.78 282.038 L 6.78 273.518 L 13.23 273.518 L 13.23 275.098 L 8.75 275.098 L 8.75 276.948 L 12.75 276.948 L 12.75 278.488 L 8.75 278.488 L 8.75 280.488 L 13.39 280.458 Z"/>
  <path class="cls-7" d="M 25.17 276.118 C 25.699 276.712 25.962 277.495 25.9 278.288 L 25.9 282.038 L 23.96 282.038 L 23.96 278.578 C 23.99 278.165 23.873 277.754 23.63 277.418 C 23.398 277.157 23.059 277.017 22.71 277.038 C 22.311 277.019 21.923 277.176 21.65 277.468 C 21.365 277.835 21.226 278.295 21.26 278.758 L 21.26 282.038 L 19.36 282.038 L 19.36 278.578 C 19.36 277.578 18.95 277.038 18.12 277.038 C 17.724 277.019 17.339 277.176 17.07 277.468 C 16.785 277.835 16.646 278.295 16.68 278.758 L 16.68 282.038 L 14.78 282.038 L 14.78 275.488 L 16.6 275.488 L 16.6 276.248 C 16.843 275.969 17.148 275.749 17.49 275.608 C 17.863 275.462 18.26 275.388 18.66 275.388 C 19.111 275.375 19.558 275.474 19.96 275.678 C 20.331 275.852 20.644 276.13 20.86 276.478 C 21.124 276.134 21.467 275.86 21.86 275.678 C 22.286 275.492 22.745 275.396 23.21 275.398 C 23.935 275.354 24.646 275.615 25.17 276.118 Z"/>
  <path class="cls-7" d="M 32.33 281.678 C 30.647 280.769 30.057 278.644 31.03 276.998 C 31.339 276.482 31.791 276.065 32.33 275.798 C 32.915 275.5 33.564 275.349 34.22 275.358 C 34.851 275.346 35.475 275.497 36.03 275.798 C 36.531 276.07 36.926 276.503 37.15 277.028 L 35.68 277.818 C 35.404 277.256 34.826 276.904 34.2 276.918 C 33.74 276.905 33.295 277.082 32.97 277.408 C 32.329 278.179 32.329 279.297 32.97 280.068 C 33.299 280.387 33.742 280.56 34.2 280.548 C 34.827 280.564 35.406 280.212 35.68 279.648 L 37.15 280.448 C 36.922 280.97 36.528 281.402 36.03 281.678 C 35.477 281.984 34.852 282.136 34.22 282.118 C 33.563 282.129 32.914 281.978 32.33 281.678 Z"/>
  <path class="cls-7" d="M 43.23 276.118 C 43.809 276.69 44.109 277.486 44.05 278.298 L 44.05 282.038 L 42.27 282.038 L 42.27 281.228 C 41.825 281.88 41.054 282.231 40.27 282.138 C 39.82 282.15 39.374 282.064 38.96 281.888 C 38.615 281.736 38.321 281.49 38.11 281.178 C 37.921 280.879 37.82 280.532 37.82 280.178 C 37.798 279.613 38.056 279.075 38.51 278.738 C 39.145 278.338 39.892 278.152 40.64 278.208 L 42.15 278.208 C 42.17 277.851 42.031 277.503 41.77 277.258 C 41.447 277.012 41.045 276.891 40.64 276.918 C 40.3 276.922 39.962 276.98 39.64 277.088 C 39.33 277.183 39.039 277.332 38.78 277.528 L 38.1 276.208 C 38.487 275.935 38.921 275.735 39.38 275.618 C 39.881 275.478 40.399 275.407 40.92 275.408 C 41.751 275.351 42.574 275.604 43.23 276.118 Z M 41.61 280.678 C 41.864 280.526 42.055 280.288 42.15 280.008 L 42.15 279.338 L 40.84 279.338 C 40.06 279.338 39.67 279.598 39.67 280.108 C 39.667 280.334 39.776 280.547 39.96 280.678 C 40.194 280.831 40.471 280.905 40.75 280.888 C 41.05 280.898 41.348 280.826 41.61 280.678 Z"/>
  <path class="cls-7" d="M 46.37 281.938 C 45.932 281.84 45.514 281.671 45.13 281.438 L 45.76 280.068 C 46.09 280.27 46.447 280.425 46.82 280.528 C 47.217 280.642 47.627 280.699 48.04 280.698 C 48.85 280.698 49.25 280.498 49.25 280.108 C 49.264 279.915 49.144 279.737 48.96 279.678 C 48.636 279.571 48.3 279.5 47.96 279.468 C 47.511 279.404 47.067 279.31 46.63 279.188 C 46.284 279.083 45.97 278.89 45.72 278.628 C 45.45 278.308 45.314 277.896 45.34 277.478 C 45.335 277.082 45.461 276.695 45.7 276.378 C 45.972 276.034 46.336 275.774 46.75 275.628 C 47.268 275.437 47.818 275.346 48.37 275.358 C 48.835 275.356 49.298 275.409 49.75 275.518 C 50.15 275.596 50.535 275.737 50.89 275.938 L 50.26 277.288 C 49.684 276.961 49.032 276.792 48.37 276.798 C 48.058 276.783 47.746 276.841 47.46 276.968 C 47.281 277.044 47.161 277.214 47.15 277.408 C 47.148 277.61 47.284 277.787 47.48 277.838 C 47.823 277.943 48.174 278.019 48.53 278.068 C 48.975 278.136 49.416 278.229 49.85 278.348 C 50.191 278.452 50.499 278.645 50.74 278.908 C 51.003 279.22 51.136 279.621 51.11 280.028 C 51.115 280.418 50.988 280.799 50.75 281.108 C 50.472 281.452 50.1 281.709 49.68 281.848 C 49.146 282.03 48.584 282.118 48.02 282.108 C 47.465 282.126 46.91 282.069 46.37 281.938 Z"/>
  <path class="cls-7" d="M 53.49 281.678 C 51.834 280.747 51.259 278.642 52.21 276.998 C 52.514 276.485 52.958 276.069 53.49 275.798 C 54.064 275.501 54.703 275.349 55.35 275.358 C 55.994 275.348 56.63 275.499 57.2 275.798 C 57.734 276.066 58.178 276.483 58.48 276.998 C 59.094 278.077 59.094 279.399 58.48 280.478 C 58.173 280.989 57.73 281.404 57.2 281.678 C 56.629 281.973 55.993 282.121 55.35 282.108 C 54.704 282.12 54.065 281.972 53.49 281.678 Z M 56.55 280.058 C 56.874 279.697 57.042 279.223 57.02 278.738 C 57.046 278.253 56.877 277.778 56.55 277.418 C 55.889 276.751 54.811 276.751 54.15 277.418 C 53.816 277.774 53.642 278.251 53.67 278.738 C 53.647 279.225 53.82 279.7 54.15 280.058 C 54.816 280.714 55.884 280.714 56.55 280.058 Z"/>
  <path class="cls-7" d="M 70.33 273.008 L 70.33 282.008 L 68.52 282.008 L 68.52 281.258 C 68.018 281.831 67.281 282.144 66.52 282.108 C 65.938 282.114 65.363 281.973 64.85 281.698 C 64.353 281.424 63.944 281.015 63.67 280.518 C 63.383 279.969 63.238 279.357 63.25 278.738 C 63.236 278.119 63.38 277.506 63.67 276.958 C 63.944 276.461 64.353 276.052 64.85 275.778 C 65.361 275.496 65.936 275.351 66.52 275.358 C 67.274 275.306 68.01 275.601 68.52 276.158 L 68.52 272.978 L 70.33 273.008 Z M 67.96 280.088 C 68.29 279.73 68.463 279.255 68.44 278.768 C 68.468 278.281 68.294 277.804 67.96 277.448 C 67.302 276.782 66.228 276.782 65.57 277.448 C 65.236 277.804 65.062 278.281 65.09 278.768 C 65.067 279.255 65.24 279.73 65.57 280.088 C 66.232 280.743 67.298 280.743 67.96 280.088 Z"/>
  <path class="cls-7" d="M 78.47 279.298 L 73.47 279.298 C 73.542 279.703 73.772 280.063 74.11 280.298 C 74.477 280.541 74.91 280.663 75.35 280.648 C 75.66 280.653 75.968 280.602 76.26 280.498 C 76.534 280.391 76.783 280.227 76.99 280.018 L 77.99 281.108 C 77.297 281.852 76.304 282.241 75.29 282.168 C 74.598 282.19 73.912 282.042 73.29 281.738 C 72.745 281.471 72.287 281.055 71.97 280.538 C 71.662 280.01 71.503 279.409 71.51 278.798 C 71.501 278.187 71.66 277.585 71.97 277.058 C 72.266 276.549 72.699 276.133 73.22 275.858 C 73.77 275.562 74.386 275.41 75.01 275.418 C 75.616 275.41 76.214 275.554 76.75 275.838 C 77.266 276.104 77.691 276.518 77.97 277.028 C 78.279 277.573 78.434 278.192 78.42 278.818 C 78.42 278.818 78.5 278.988 78.47 279.298 Z M 74.02 277.198 C 73.72 277.45 73.53 277.809 73.49 278.198 L 76.72 278.198 C 76.667 277.81 76.475 277.455 76.18 277.198 C 75.881 276.947 75.5 276.815 75.11 276.828 C 74.714 276.816 74.327 276.947 74.02 277.198 Z"/>
  <path class="cls-7" d="M 89.17 276.118 C 89.708 276.707 89.979 277.492 89.92 278.288 L 89.92 282.038 L 88.02 282.038 L 88.02 278.578 C 88.052 278.163 87.931 277.75 87.68 277.418 C 87.418 277.151 87.053 277.013 86.68 277.038 C 86.255 277.017 85.841 277.177 85.54 277.478 C 85.229 277.844 85.074 278.319 85.11 278.798 L 85.11 282.038 L 83.21 282.038 L 83.21 275.488 L 85.03 275.488 L 85.03 276.258 C 85.286 275.975 85.605 275.756 85.96 275.618 C 86.355 275.463 86.776 275.385 87.2 275.388 C 87.928 275.357 88.638 275.62 89.17 276.118 Z"/>
  <path class="cls-7" d="M 98.09 279.298 L 93.14 279.298 C 93.212 279.701 93.438 280.059 93.77 280.298 C 94.137 280.54 94.57 280.662 95.01 280.648 C 95.32 280.654 95.628 280.603 95.92 280.498 C 96.196 280.389 96.448 280.225 96.66 280.018 L 97.66 281.108 C 96.958 281.836 95.968 282.213 94.96 282.138 C 94.268 282.158 93.582 282.011 92.96 281.708 C 92.418 281.441 91.964 281.024 91.65 280.508 C 91.334 279.983 91.172 279.38 91.18 278.768 C 91.176 278.157 91.335 277.557 91.64 277.028 C 91.939 276.518 92.376 276.102 92.9 275.828 C 94.003 275.255 95.317 275.255 96.42 275.828 C 96.937 276.097 97.364 276.51 97.65 277.018 C 97.951 277.566 98.103 278.183 98.09 278.808 C 98.09 278.808 98.12 278.988 98.09 279.298 Z M 93.65 277.198 C 93.351 277.452 93.159 277.809 93.11 278.198 L 96.34 278.198 C 96.295 277.81 96.106 277.453 95.81 277.198 C 95.507 276.947 95.123 276.815 94.73 276.828 C 94.337 276.813 93.952 276.945 93.65 277.198 Z"/>
  <path class="cls-7" d="M 100.68 281.678 C 98.997 280.769 98.407 278.644 99.38 276.998 C 99.689 276.482 100.141 276.065 100.68 275.798 C 101.265 275.5 101.914 275.349 102.57 275.358 C 103.198 275.344 103.819 275.496 104.37 275.798 C 104.874 276.07 105.272 276.503 105.5 277.028 L 104.03 277.818 C 103.752 277.257 103.176 276.907 102.55 276.918 C 102.09 276.905 101.645 277.082 101.32 277.408 C 100.679 278.179 100.679 279.297 101.32 280.068 C 101.649 280.387 102.092 280.56 102.55 280.548 C 103.176 280.562 103.754 280.21 104.03 279.648 L 105.5 280.448 C 105.266 280.967 104.869 281.395 104.37 281.668 C 103.821 281.975 103.199 282.127 102.57 282.108 C 101.914 282.122 101.265 281.974 100.68 281.678 Z"/>
  <path class="cls-7" d="M 112.9 279.298 L 107.9 279.298 C 107.972 279.701 108.198 280.059 108.53 280.298 C 108.897 280.54 109.33 280.662 109.77 280.648 C 110.08 280.654 110.388 280.603 110.68 280.498 C 110.957 280.391 111.209 280.228 111.42 280.018 L 112.42 281.108 C 111.721 281.85 110.727 282.239 109.71 282.168 C 109.018 282.188 108.332 282.041 107.71 281.738 C 107.17 281.468 106.716 281.052 106.4 280.538 C 106.087 280.012 105.928 279.41 105.94 278.798 C 105.932 278.188 106.088 277.588 106.39 277.058 C 106.689 276.548 107.126 276.132 107.65 275.858 C 108.753 275.285 110.067 275.285 111.17 275.858 C 111.687 276.127 112.114 276.54 112.4 277.048 C 112.701 277.596 112.853 278.213 112.84 278.838 C 112.84 278.838 112.96 278.988 112.9 279.298 Z M 108.45 277.198 C 108.151 277.452 107.959 277.809 107.91 278.198 L 111.14 278.198 C 111.095 277.81 110.906 277.453 110.61 277.198 C 110.307 276.947 109.923 276.815 109.53 276.828 C 109.137 276.813 108.752 276.945 108.45 277.198 Z"/>
  <path class="cls-7" d="M 114.81 281.938 C 114.372 281.842 113.952 281.673 113.57 281.438 L 114.2 280.068 C 114.528 280.274 114.886 280.429 115.26 280.528 C 115.656 280.643 116.067 280.7 116.48 280.698 C 117.28 280.698 117.68 280.498 117.68 280.108 C 117.675 279.915 117.539 279.749 117.35 279.708 C 117.026 279.6 116.69 279.529 116.35 279.498 C 115.901 279.433 115.457 279.339 115.02 279.218 C 114.677 279.112 114.367 278.919 114.12 278.658 C 113.843 278.341 113.703 277.928 113.73 277.508 C 113.725 277.112 113.851 276.725 114.09 276.408 C 114.349 276.072 114.695 275.812 115.09 275.658 C 115.612 275.467 116.165 275.375 116.72 275.388 C 117.185 275.387 117.648 275.441 118.1 275.548 C 118.5 275.626 118.885 275.767 119.24 275.968 L 118.6 277.318 C 118.028 276.99 117.379 276.82 116.72 276.828 C 116.404 276.811 116.089 276.869 115.8 276.998 C 115.624 277.075 115.507 277.246 115.5 277.438 C 115.498 277.64 115.634 277.817 115.83 277.868 C 116.157 277.97 116.491 278.047 116.83 278.098 C 117.272 278.167 117.709 278.26 118.14 278.378 C 118.481 278.482 118.789 278.675 119.03 278.938 C 119.297 279.248 119.433 279.65 119.41 280.058 C 119.416 280.45 119.285 280.832 119.04 281.138 C 118.765 281.482 118.397 281.739 117.98 281.878 C 117.442 282.06 116.877 282.148 116.31 282.138 C 115.804 282.134 115.3 282.067 114.81 281.938 Z"/>
  <path class="cls-7" d="M 121.27 281.938 C 120.833 281.838 120.414 281.669 120.03 281.438 L 120.67 280.068 C 120.998 280.274 121.356 280.429 121.73 280.528 C 122.131 280.637 122.545 280.688 122.96 280.678 C 123.77 280.678 124.17 280.478 124.17 280.088 C 124.165 279.895 124.029 279.729 123.84 279.688 C 123.516 279.58 123.18 279.509 122.84 279.478 C 122.391 279.414 121.947 279.32 121.51 279.198 C 121.164 279.093 120.85 278.9 120.6 278.638 C 120.33 278.318 120.194 277.906 120.22 277.488 C 120.215 277.092 120.341 276.705 120.58 276.388 C 120.839 276.052 121.185 275.792 121.58 275.638 C 122.098 275.448 122.648 275.356 123.2 275.368 C 123.668 275.366 124.135 275.42 124.59 275.528 C 124.99 275.606 125.375 275.747 125.73 275.948 L 125.09 277.298 C 124.515 276.968 123.863 276.799 123.2 276.808 C 122.888 276.793 122.576 276.851 122.29 276.978 C 122.114 277.055 121.997 277.226 121.99 277.418 C 121.987 277.617 122.118 277.794 122.31 277.848 C 122.637 277.95 122.971 278.027 123.31 278.078 C 123.755 278.146 124.196 278.239 124.63 278.358 C 124.971 278.462 125.279 278.655 125.52 278.918 C 125.787 279.228 125.923 279.63 125.9 280.038 C 125.902 280.429 125.771 280.81 125.53 281.118 C 125.254 281.464 124.881 281.722 124.46 281.858 C 123.926 282.041 123.364 282.129 122.8 282.118 C 122.284 282.122 121.77 282.062 121.27 281.938 Z"/>
  <path class="cls-7" d="M 127.23 274.268 C 127.018 274.077 126.898 273.804 126.9 273.518 C 126.895 273.229 127.015 272.952 127.23 272.758 C 127.464 272.552 127.769 272.445 128.08 272.458 C 128.393 272.442 128.701 272.545 128.94 272.748 C 129.147 272.935 129.267 273.199 129.27 273.478 C 129.284 273.777 129.163 274.067 128.94 274.268 C 128.703 274.477 128.396 274.588 128.08 274.578 C 127.767 274.593 127.46 274.481 127.23 274.268 Z M 127.13 275.488 L 129.03 275.488 L 129.03 282.038 L 127.13 282.038 L 127.13 275.488 Z"/>
  <path class="cls-7" d="M 137.48 273.008 L 137.48 282.008 L 135.66 282.008 L 135.66 281.258 C 135.158 281.831 134.421 282.144 133.66 282.108 C 133.078 282.114 132.503 281.973 131.99 281.698 C 131.493 281.424 131.084 281.015 130.81 280.518 C 130.523 279.969 130.378 279.357 130.39 278.738 C 130.376 278.119 130.52 277.506 130.81 276.958 C 131.084 276.461 131.493 276.052 131.99 275.778 C 132.501 275.496 133.076 275.351 133.66 275.358 C 134.414 275.306 135.15 275.601 135.66 276.158 L 135.66 272.978 L 137.48 273.008 Z M 135.14 280.088 C 135.464 279.727 135.632 279.253 135.61 278.768 C 135.636 278.283 135.467 277.808 135.14 277.448 C 134.479 276.781 133.401 276.781 132.74 277.448 C 132.406 277.804 132.232 278.281 132.26 278.768 C 132.237 279.255 132.41 279.73 132.74 280.088 C 133.406 280.744 134.474 280.744 135.14 280.088 Z"/>
  <path class="cls-7" d="M 144.21 276.118 C 144.794 276.687 145.094 277.486 145.03 278.298 L 145.03 282.038 L 143.25 282.038 L 143.25 281.228 C 142.805 281.88 142.034 282.231 141.25 282.138 C 140.8 282.15 140.354 282.064 139.94 281.888 C 139.596 281.739 139.304 281.492 139.1 281.178 C 138.903 280.882 138.799 280.534 138.8 280.178 C 138.778 279.613 139.036 279.075 139.49 278.738 C 140.125 278.338 140.872 278.152 141.62 278.208 L 143.13 278.208 C 143.15 277.851 143.011 277.503 142.75 277.258 C 142.427 277.012 142.025 276.891 141.62 276.918 C 141.28 276.922 140.942 276.98 140.62 277.088 C 140.31 277.183 140.019 277.332 139.76 277.528 L 139.08 276.208 C 139.467 275.935 139.901 275.735 140.36 275.618 C 140.861 275.478 141.38 275.408 141.9 275.408 C 142.731 275.351 143.554 275.604 144.21 276.118 Z M 142.59 280.678 C 142.844 280.526 143.035 280.288 143.13 280.008 L 143.13 279.338 L 141.82 279.338 C 141.04 279.338 140.65 279.598 140.65 280.108 C 140.644 280.338 140.753 280.555 140.94 280.688 C 141.174 280.841 141.451 280.915 141.73 280.898 C 142.031 280.905 142.329 280.829 142.59 280.678 Z"/>
  <path class="cls-7" d="M 153.49 273.008 L 153.49 282.008 L 151.68 282.008 L 151.68 281.258 C 151.167 281.846 150.409 282.16 149.63 282.108 C 149.048 282.115 148.473 281.974 147.96 281.698 C 147.463 281.424 147.054 281.015 146.78 280.518 C 146.489 279.97 146.341 279.358 146.35 278.738 C 146.339 278.118 146.487 277.505 146.78 276.958 C 147.05 276.458 147.46 276.048 147.96 275.778 C 148.47 275.494 149.046 275.35 149.63 275.358 C 150.384 275.306 151.12 275.601 151.63 276.158 L 151.63 272.978 L 153.49 273.008 Z M 151.15 280.088 C 151.48 279.73 151.653 279.255 151.63 278.768 C 151.658 278.281 151.484 277.804 151.15 277.448 C 150.843 277.118 150.41 276.936 149.96 276.948 C 149.504 276.936 149.064 277.117 148.75 277.448 C 148.423 277.808 148.254 278.283 148.28 278.768 C 148.258 279.253 148.426 279.727 148.75 280.088 C 149.066 280.415 149.506 280.593 149.96 280.578 C 150.409 280.594 150.842 280.415 151.15 280.088 Z"/>
  <path class="cls-7" d="M 161.63 279.298 L 156.63 279.298 C 156.702 279.703 156.932 280.063 157.27 280.298 C 157.637 280.541 158.07 280.663 158.51 280.648 C 158.82 280.653 159.128 280.602 159.42 280.498 C 159.694 280.391 159.943 280.227 160.15 280.018 L 161.15 281.108 C 160.457 281.852 159.464 282.241 158.45 282.168 C 157.758 282.19 157.072 282.042 156.45 281.738 C 155.905 281.471 155.447 281.055 155.13 280.538 C 154.817 280.012 154.658 279.41 154.67 278.798 C 154.661 278.187 154.82 277.585 155.13 277.058 C 155.426 276.549 155.859 276.133 156.38 275.858 C 156.93 275.562 157.546 275.41 158.17 275.418 C 158.776 275.41 159.374 275.554 159.91 275.838 C 160.426 276.104 160.851 276.518 161.13 277.028 C 161.439 277.573 161.594 278.192 161.58 278.818 C 161.58 278.818 161.66 278.988 161.63 279.298 Z M 157.18 277.198 C 156.88 277.45 156.69 277.809 156.65 278.198 L 159.88 278.198 C 159.827 277.81 159.635 277.455 159.34 277.198 C 159.041 276.947 158.66 276.815 158.27 276.828 C 157.874 276.816 157.487 276.947 157.18 277.198 Z"/>
  <path class="cls-7" d="M 14.06 287.618 L 14.06 296.618 L 12.24 296.618 L 12.24 295.868 C 11.738 296.441 11.001 296.754 10.24 296.718 C 9.658 296.724 9.083 296.583 8.57 296.308 C 8.072 296.031 7.662 295.619 7.39 295.118 C 6.836 293.999 6.836 292.687 7.39 291.568 C 7.662 291.067 8.072 290.655 8.57 290.378 C 9.083 290.103 9.658 289.962 10.24 289.968 C 10.992 289.917 11.726 290.207 12.24 290.758 L 12.24 287.578 L 14.06 287.618 Z M 11.72 294.678 C 12.348 293.906 12.348 292.8 11.72 292.028 C 11.054 291.372 9.986 291.372 9.32 292.028 C 8.68 292.796 8.68 293.91 9.32 294.678 C 9.986 295.334 11.054 295.334 11.72 294.678 Z"/>
  <path class="cls-7" d="M 22.19 293.918 L 17.24 293.918 C 17.306 294.323 17.534 294.683 17.87 294.918 C 18.234 295.167 18.669 295.293 19.11 295.278 C 19.421 295.285 19.73 295.231 20.02 295.118 C 20.296 295.009 20.548 294.845 20.76 294.638 L 21.76 295.738 C 21.061 296.48 20.067 296.869 19.05 296.798 C 18.358 296.82 17.672 296.672 17.05 296.368 C 16.506 296.103 16.051 295.686 15.74 295.168 C 15.423 294.64 15.26 294.034 15.27 293.418 C 15.266 292.811 15.424 292.213 15.73 291.688 C 16.025 291.176 16.458 290.756 16.98 290.478 C 18.09 289.918 19.4 289.918 20.51 290.478 C 21.023 290.753 21.449 291.165 21.74 291.668 C 22.039 292.22 22.191 292.84 22.18 293.468 C 22.18 293.468 22.22 293.598 22.19 293.918 Z M 17.75 291.808 C 17.451 292.062 17.259 292.419 17.21 292.808 L 20.44 292.808 C 20.333 292.008 19.636 291.42 18.83 291.448 C 18.439 291.435 18.055 291.563 17.75 291.808 Z"/>
  <path class="cls-7" d="M 29.68 290.248 C 30.103 290.081 30.555 289.999 31.01 290.008 L 31.01 291.768 L 30.59 291.768 C 30.118 291.739 29.655 291.905 29.31 292.228 C 28.972 292.601 28.802 293.096 28.84 293.598 L 28.84 296.678 L 26.96 296.678 L 26.96 290.128 L 28.76 290.128 L 28.76 290.988 C 28.994 290.663 29.312 290.407 29.68 290.248 Z"/>
  <path class="cls-7" d="M 38.47 293.918 L 33.47 293.918 C 33.536 294.323 33.764 294.683 34.1 294.918 C 34.468 295.167 34.906 295.293 35.35 295.278 C 35.658 295.286 35.964 295.231 36.25 295.118 C 36.527 295.011 36.779 294.848 36.99 294.638 L 37.99 295.738 C 37.294 296.478 36.303 296.867 35.29 296.798 C 34.598 296.821 33.911 296.673 33.29 296.368 C 32.745 296.101 32.287 295.685 31.97 295.168 C 31.656 294.639 31.497 294.033 31.51 293.418 C 31.502 292.811 31.657 292.214 31.96 291.688 C 32.262 291.178 32.698 290.759 33.22 290.478 C 33.767 290.186 34.38 290.038 35 290.048 C 35.608 290.04 36.209 290.181 36.75 290.458 C 37.26 290.733 37.682 291.145 37.97 291.648 C 38.277 292.197 38.433 292.819 38.42 293.448 C 38.42 293.448 38.49 293.598 38.47 293.918 Z M 34.02 291.808 C 33.724 292.063 33.535 292.42 33.49 292.808 L 36.71 292.808 C 36.665 292.42 36.476 292.063 36.18 291.808 C 35.881 291.557 35.5 291.425 35.11 291.438 C 34.714 291.427 34.328 291.559 34.02 291.808 Z"/>
  <path class="cls-7" d="M 45.31 290.428 C 45.803 290.703 46.209 291.112 46.48 291.608 C 47.053 292.722 47.053 294.044 46.48 295.158 C 46.209 295.654 45.803 296.063 45.31 296.338 C 44.802 296.619 44.23 296.764 43.65 296.758 C 42.899 296.805 42.166 296.516 41.65 295.968 L 41.65 299.028 L 39.75 299.028 L 39.75 290.108 L 41.57 290.108 L 41.57 290.858 C 42.088 290.271 42.849 289.957 43.63 290.008 C 44.217 289.999 44.796 290.144 45.31 290.428 Z M 44.52 294.678 C 45.148 293.906 45.148 292.8 44.52 292.028 C 44.207 291.703 43.771 291.525 43.32 291.538 C 42.868 291.521 42.431 291.699 42.12 292.028 C 41.492 292.8 41.492 293.906 42.12 294.678 C 42.431 295.007 42.868 295.185 43.32 295.168 C 43.771 295.181 44.207 295.003 44.52 294.678 Z"/>
  <path class="cls-7" d="M 53.05 290.738 C 53.629 291.31 53.929 292.106 53.87 292.918 L 53.87 296.678 L 52.09 296.678 L 52.09 295.868 C 51.64 296.515 50.873 296.864 50.09 296.778 C 49.64 296.787 49.193 296.698 48.78 296.518 C 48.437 296.369 48.142 296.126 47.93 295.818 C 47.741 295.519 47.641 295.172 47.64 294.818 C 47.618 294.256 47.876 293.72 48.33 293.388 C 48.962 292.99 49.705 292.804 50.45 292.858 L 51.96 292.858 C 51.98 292.501 51.841 292.153 51.58 291.908 C 51.256 291.656 50.849 291.535 50.44 291.568 C 50.1 291.572 49.762 291.63 49.44 291.738 C 49.128 291.829 48.836 291.978 48.58 292.178 L 47.89 290.848 C 48.285 290.584 48.721 290.388 49.18 290.268 C 49.681 290.128 50.199 290.057 50.72 290.058 C 51.554 289.987 52.385 290.23 53.05 290.738 Z M 51.43 295.248 C 51.681 295.097 51.871 294.864 51.97 294.588 L 51.97 293.918 L 50.66 293.918 C 49.88 293.918 49.49 294.178 49.49 294.688 C 49.488 294.917 49.596 295.133 49.78 295.268 C 50.011 295.42 50.284 295.493 50.56 295.478 C 50.866 295.488 51.169 295.408 51.43 295.248 Z"/>
  <path class="cls-7" d="M 58.32 290.248 C 58.743 290.081 59.195 289.999 59.65 290.008 L 59.65 291.768 L 59.23 291.768 C 58.758 291.737 58.294 291.903 57.95 292.228 C 57.612 292.601 57.442 293.096 57.48 293.598 L 57.48 296.678 L 55.58 296.678 L 55.58 290.128 L 57.4 290.128 L 57.4 290.988 C 57.634 290.663 57.952 290.407 58.32 290.248 Z"/>
  <path class="cls-7" d="M 61.96 296.328 C 59.693 295.131 59.571 291.93 61.741 290.564 C 61.812 290.52 61.885 290.477 61.96 290.438 C 62.535 290.144 63.174 289.996 63.82 290.008 C 64.463 289.995 65.099 290.143 65.67 290.438 C 66.209 290.721 66.656 291.151 66.96 291.678 C 67.588 292.757 67.588 294.089 66.96 295.168 C 66.653 295.679 66.21 296.094 65.68 296.368 C 65.109 296.663 64.473 296.811 63.83 296.798 C 63.177 296.799 62.534 296.638 61.96 296.328 Z M 65.04 294.678 C 65.668 293.906 65.668 292.8 65.04 292.028 C 64.374 291.372 63.306 291.372 62.64 292.028 C 62 292.796 62 293.91 62.64 294.678 C 63.306 295.334 64.374 295.334 65.04 294.678 Z"/>
  <path class="cls-7" d="M 70.19 294.678 C 70.413 294.899 70.533 295.204 70.52 295.518 C 70.52 295.683 70.5 295.848 70.46 296.008 C 70.39 296.258 70.3 296.503 70.19 296.738 L 69.49 298.498 L 68.29 298.498 L 68.82 296.558 C 68.621 296.479 68.453 296.339 68.34 296.158 C 68.224 295.965 68.166 295.743 68.17 295.518 C 68.157 295.204 68.277 294.899 68.5 294.678 C 68.727 294.459 69.035 294.344 69.35 294.358 C 69.662 294.344 69.966 294.46 70.19 294.678 Z"/>
  <path class="cls-7" d="M 75.87 296.558 C 75.429 296.456 75.007 296.284 74.62 296.048 L 75.26 294.678 C 75.588 294.884 75.946 295.039 76.32 295.138 C 76.714 295.247 77.121 295.304 77.53 295.308 C 78.34 295.308 78.74 295.108 78.74 294.718 C 78.736 294.522 78.601 294.354 78.41 294.308 C 78.085 294.204 77.75 294.137 77.41 294.108 C 76.961 294.044 76.517 293.95 76.08 293.828 C 75.735 293.719 75.423 293.526 75.17 293.268 C 74.9 292.948 74.764 292.536 74.79 292.118 C 74.785 291.722 74.911 291.335 75.15 291.018 C 75.409 290.682 75.755 290.422 76.15 290.268 C 76.668 290.078 77.218 289.986 77.77 289.998 C 78.237 289.998 78.703 290.048 79.16 290.148 C 79.56 290.226 79.945 290.367 80.3 290.568 L 79.66 291.928 C 79.085 291.598 78.433 291.429 77.77 291.438 C 77.457 291.416 77.144 291.475 76.86 291.608 C 76.684 291.685 76.567 291.856 76.56 292.048 C 76.558 292.245 76.69 292.418 76.88 292.468 C 77.232 292.573 77.594 292.643 77.96 292.678 C 78.405 292.749 78.846 292.845 79.28 292.968 C 79.621 293.072 79.929 293.265 80.17 293.528 C 80.435 293.839 80.568 294.241 80.54 294.648 C 80.543 295.038 80.416 295.418 80.18 295.728 C 79.901 296.071 79.53 296.328 79.11 296.468 C 78.576 296.651 78.014 296.739 77.45 296.728 C 76.918 296.736 76.388 296.679 75.87 296.558 Z"/>
  <path class="cls-7" d="M 82.96 296.328 C 82.428 296.054 81.981 295.639 81.67 295.128 C 81.057 294.045 81.057 292.721 81.67 291.638 C 81.981 291.127 82.428 290.712 82.96 290.438 C 84.127 289.864 85.493 289.864 86.66 290.438 C 87.204 290.717 87.656 291.148 87.96 291.678 C 88.588 292.757 88.588 294.089 87.96 295.168 C 87.655 295.681 87.211 296.097 86.68 296.368 C 85.513 296.942 84.147 296.942 82.98 296.368 L 82.96 296.328 Z M 85.96 294.708 C 86.588 293.936 86.588 292.83 85.96 292.058 C 85.294 291.402 84.226 291.402 83.56 292.058 C 82.92 292.826 82.92 293.94 83.56 294.708 C 84.226 295.364 85.294 295.364 85.96 294.708 Z M 85.27 287.508 L 87.27 287.508 L 85.07 289.268 L 83.71 289.268 L 85.27 287.508 Z"/>
  <path class="cls-7" d="M 99.53 293.918 L 94.53 293.918 C 94.601 294.323 94.832 294.684 95.17 294.918 C 95.534 295.167 95.969 295.293 96.41 295.278 C 96.721 295.285 97.03 295.23 97.32 295.118 C 97.596 295.009 97.848 294.845 98.06 294.638 L 99.06 295.738 C 98.361 296.48 97.367 296.869 96.35 296.798 C 95.658 296.82 94.972 296.672 94.35 296.368 C 93.806 296.103 93.351 295.686 93.04 295.168 C 92.723 294.64 92.56 294.034 92.57 293.418 C 92.566 292.811 92.724 292.213 93.03 291.688 C 93.325 291.176 93.758 290.756 94.28 290.478 C 95.39 289.918 96.7 289.918 97.81 290.478 C 98.323 290.748 98.747 291.162 99.03 291.668 C 99.337 292.217 99.493 292.839 99.48 293.468 C 99.48 293.468 99.56 293.598 99.53 293.918 Z M 95.09 291.808 C 94.791 292.062 94.599 292.419 94.55 292.808 L 97.78 292.808 C 97.673 292.008 96.976 291.42 96.17 291.448 C 95.779 291.435 95.395 291.563 95.09 291.808 Z"/>
  <path class="cls-7" d="M 101.44 296.558 C 101.002 296.457 100.583 296.284 100.2 296.048 L 100.84 294.688 C 101.168 294.894 101.526 295.049 101.9 295.148 C 102.294 295.257 102.701 295.314 103.11 295.318 C 103.92 295.318 104.32 295.118 104.32 294.728 C 104.316 294.532 104.181 294.364 103.99 294.318 C 103.665 294.215 103.33 294.148 102.99 294.118 C 102.541 294.054 102.097 293.96 101.66 293.838 C 101.315 293.729 101.003 293.536 100.75 293.278 C 100.48 292.958 100.344 292.546 100.37 292.128 C 100.365 291.732 100.491 291.345 100.73 291.028 C 100.989 290.692 101.335 290.432 101.73 290.278 C 102.248 290.088 102.798 289.996 103.35 290.008 C 103.817 290.008 104.283 290.058 104.74 290.158 C 105.14 290.236 105.525 290.377 105.88 290.578 L 105.24 291.938 C 104.665 291.608 104.013 291.439 103.35 291.448 C 103.037 291.426 102.724 291.485 102.44 291.618 C 102.264 291.695 102.147 291.866 102.14 292.058 C 102.138 292.255 102.27 292.428 102.46 292.478 C 102.786 292.584 103.12 292.661 103.46 292.708 C 103.905 292.779 104.346 292.875 104.78 292.998 C 105.121 293.102 105.429 293.295 105.67 293.558 C 105.938 293.868 106.074 294.269 106.05 294.678 C 106.05 295.069 105.92 295.449 105.68 295.758 C 105.401 296.101 105.03 296.358 104.61 296.498 C 104.076 296.681 103.514 296.769 102.95 296.758 C 102.441 296.75 101.934 296.683 101.44 296.558 Z"/>
  <path class="cls-7" d="M 108.59 296.328 C 106.323 295.165 106.165 291.984 108.306 290.602 C 108.398 290.543 108.493 290.488 108.59 290.438 C 109.172 290.143 109.818 289.996 110.47 290.008 C 111.1 289.992 111.724 290.14 112.28 290.438 C 112.785 290.713 113.183 291.15 113.41 291.678 L 111.93 292.468 C 111.655 291.909 111.083 291.558 110.46 291.568 C 109.999 291.55 109.552 291.728 109.23 292.058 C 108.889 292.41 108.711 292.889 108.74 293.378 C 108.711 293.87 108.889 294.352 109.23 294.708 C 109.552 295.038 109.999 295.216 110.46 295.198 C 111.084 295.213 111.659 294.861 111.93 294.298 L 113.41 295.098 C 113.176 295.617 112.779 296.045 112.28 296.318 C 111.725 296.619 111.101 296.77 110.47 296.758 C 109.818 296.77 109.172 296.623 108.59 296.328 Z"/>
  <path class="cls-7" d="M 119.48 290.738 C 120.064 291.307 120.364 292.106 120.3 292.918 L 120.3 296.678 L 118.52 296.678 L 118.52 295.868 C 118.075 296.52 117.304 296.871 116.52 296.778 C 116.073 296.787 115.629 296.698 115.22 296.518 C 114.874 296.373 114.579 296.129 114.37 295.818 C 114.177 295.521 114.076 295.173 114.08 294.818 C 114.059 294.259 114.313 293.725 114.76 293.388 C 115.395 292.988 116.142 292.802 116.89 292.858 L 118.4 292.858 C 118.42 292.501 118.281 292.153 118.02 291.908 C 117.699 291.657 117.296 291.535 116.89 291.568 C 116.55 291.573 116.213 291.63 115.89 291.738 C 115.579 291.831 115.288 291.98 115.03 292.178 L 114.35 290.848 C 114.745 290.584 115.181 290.388 115.64 290.268 C 116.141 290.127 116.659 290.056 117.18 290.058 C 118.004 289.994 118.823 290.236 119.48 290.738 Z M 117.87 295.248 C 118.118 295.096 118.305 294.863 118.4 294.588 L 118.4 293.918 L 117.1 293.918 C 116.32 293.918 115.93 294.178 115.93 294.688 C 115.924 294.915 116.028 295.132 116.21 295.268 C 116.444 295.42 116.721 295.493 117 295.478 C 117.306 295.485 117.608 295.405 117.87 295.248 Z"/>
  <path class="cls-7" d="M 127.96 290.738 C 128.498 291.327 128.769 292.112 128.71 292.908 L 128.71 296.678 L 126.81 296.678 L 126.81 293.218 C 126.84 292.803 126.719 292.391 126.47 292.058 C 126.212 291.784 125.845 291.641 125.47 291.668 C 125.043 291.646 124.627 291.81 124.33 292.118 C 124.019 292.484 123.864 292.959 123.9 293.438 L 123.9 296.678 L 122 296.678 L 122 290.128 L 123.81 290.128 L 123.81 290.898 C 124.072 290.617 124.393 290.399 124.75 290.258 C 125.141 290.102 125.559 290.024 125.98 290.028 C 126.709 289.987 127.423 290.243 127.96 290.738 Z"/>
  <path class="cls-7" d="M 136.89 293.918 L 131.89 293.918 C 131.961 294.323 132.192 294.684 132.53 294.918 C 132.894 295.167 133.329 295.293 133.77 295.278 C 134.081 295.285 134.39 295.23 134.68 295.118 C 134.956 295.009 135.208 294.845 135.42 294.638 L 136.42 295.738 C 135.721 296.48 134.727 296.869 133.71 296.798 C 133.018 296.82 132.332 296.672 131.71 296.368 C 131.166 296.103 130.711 295.686 130.4 295.168 C 130.083 294.64 129.92 294.034 129.93 293.418 C 129.926 292.811 130.084 292.213 130.39 291.688 C 130.685 291.176 131.118 290.756 131.64 290.478 C 132.75 289.918 134.06 289.918 135.17 290.478 C 135.683 290.748 136.107 291.162 136.39 291.668 C 136.697 292.217 136.853 292.839 136.84 293.468 C 136.84 293.468 136.96 293.598 136.89 293.918 Z M 132.45 291.808 C 132.151 292.062 131.959 292.419 131.91 292.808 L 135.14 292.808 C 135.033 292.008 134.336 291.42 133.53 291.448 C 133.139 291.435 132.755 291.563 132.45 291.808 Z"/>
  <path class="cls-7" d="M 142.96 290.738 C 143.544 291.307 143.844 292.106 143.78 292.918 L 143.78 296.678 L 142 296.678 L 142 295.868 C 141.553 296.518 140.784 296.868 140 296.778 C 139.55 296.787 139.103 296.698 138.69 296.518 C 138.35 296.367 138.06 296.125 137.85 295.818 C 137.657 295.521 137.556 295.173 137.56 294.818 C 137.539 294.259 137.793 293.725 138.24 293.388 C 138.875 292.988 139.622 292.802 140.37 292.858 L 141.96 292.858 C 141.98 292.501 141.841 292.153 141.58 291.908 C 141.259 291.657 140.856 291.535 140.45 291.568 C 140.11 291.573 139.773 291.63 139.45 291.738 C 139.139 291.831 138.848 291.98 138.59 292.178 L 137.91 290.848 C 138.305 290.584 138.741 290.388 139.2 290.268 C 139.701 290.127 140.219 290.056 140.74 290.058 C 141.537 290.014 142.324 290.255 142.96 290.738 Z M 141.35 295.248 C 141.598 295.096 141.785 294.863 141.88 294.588 L 141.88 293.918 L 140.58 293.918 C 139.8 293.918 139.41 294.178 139.41 294.688 C 139.404 294.915 139.508 295.132 139.69 295.268 C 139.924 295.42 140.201 295.493 140.48 295.478 C 140.796 295.491 141.109 295.411 141.38 295.248 L 141.35 295.248 Z"/>
  <path class="cls-7" d="M 148.26 290.248 C 148.687 290.081 149.142 289.999 149.6 290.008 L 149.6 291.768 L 149.17 291.768 C 148.698 291.74 148.236 291.906 147.89 292.228 C 147.555 292.602 147.389 293.098 147.43 293.598 L 147.43 296.678 L 145.53 296.678 L 145.53 290.128 L 147.34 290.128 L 147.34 290.988 C 147.576 290.665 147.894 290.41 148.26 290.248 Z"/>
  <path class="cls-7" d="M 155.49 296.328 C 154.958 296.054 154.511 295.639 154.2 295.128 C 153.587 294.045 153.587 292.721 154.2 291.638 C 154.511 291.127 154.958 290.712 155.49 290.438 C 156.061 290.143 156.697 289.995 157.34 290.008 C 157.986 289.996 158.625 290.144 159.2 290.438 C 159.727 290.712 160.167 291.128 160.47 291.638 C 161.098 292.717 161.098 294.049 160.47 295.128 C 160.167 295.638 159.727 296.054 159.2 296.328 C 158.625 296.622 157.986 296.77 157.34 296.758 C 156.697 296.771 156.061 296.623 155.49 296.328 Z M 158.54 294.708 C 159.168 293.936 159.168 292.83 158.54 292.058 C 157.874 291.402 156.806 291.402 156.14 292.058 C 155.5 292.826 155.5 293.94 156.14 294.708 C 156.806 295.364 157.874 295.364 158.54 294.708 Z"/>
  <path class="cls-7" d="M 12.6 312.188 C 12.331 312.521 11.989 312.788 11.6 312.968 C 11.191 313.15 10.748 313.242 10.3 313.238 C 9.702 313.245 9.111 313.104 8.58 312.828 C 7.924 312.443 7.334 311.957 6.83 311.388 C 6.096 311.307 5.389 311.065 4.76 310.678 C 3.546 309.872 2.824 308.505 2.84 307.048 C 2.827 306.252 3.038 305.469 3.45 304.788 C 3.848 304.115 4.426 303.568 5.12 303.208 C 5.857 302.822 6.678 302.626 7.51 302.638 C 8.342 302.626 9.163 302.822 9.9 303.208 C 10.588 303.576 11.164 304.122 11.57 304.788 C 11.974 305.472 12.182 306.254 12.17 307.048 C 12.191 307.983 11.899 308.898 11.34 309.648 C 10.791 310.393 10.016 310.94 9.13 311.208 C 9.298 311.395 9.498 311.551 9.72 311.668 C 9.914 311.76 10.125 311.808 10.34 311.808 C 10.871 311.806 11.375 311.573 11.72 311.168 L 12.6 312.188 Z M 5.19 308.428 C 5.408 308.843 5.737 309.189 6.14 309.428 C 6.559 309.658 7.032 309.775 7.51 309.768 C 7.985 309.777 8.455 309.66 8.87 309.428 C 9.293 309.198 9.64 308.851 9.87 308.428 C 10.106 307.996 10.227 307.51 10.22 307.018 C 10.227 306.523 10.106 306.034 9.87 305.598 C 9.638 305.177 9.291 304.83 8.87 304.598 C 8.455 304.366 7.985 304.249 7.51 304.258 C 7.032 304.251 6.559 304.368 6.14 304.598 C 5.739 304.84 5.411 305.185 5.19 305.598 C 4.954 306.034 4.833 306.523 4.84 307.018 C 4.833 307.51 4.954 307.996 5.19 308.428 Z"/>
  <path class="cls-7" d="M 19.09 311.278 L 17.45 308.898 L 15.63 308.898 L 15.63 311.278 L 13.63 311.278 L 13.63 302.748 L 17.32 302.748 C 18.006 302.729 18.688 302.859 19.32 303.128 C 19.843 303.351 20.288 303.723 20.6 304.198 C 20.907 304.693 21.063 305.266 21.05 305.848 C 21.066 306.424 20.909 306.992 20.6 307.478 C 20.276 307.948 19.825 308.315 19.3 308.538 L 21.21 311.278 L 19.09 311.278 Z M 18.59 304.738 C 18.197 304.46 17.72 304.325 17.24 304.358 L 15.63 304.358 L 15.63 307.358 L 17.24 307.358 C 17.722 307.396 18.202 307.257 18.59 306.968 C 18.908 306.698 19.082 306.295 19.06 305.878 C 19.093 305.445 18.918 305.022 18.59 304.738 Z"/>
  <path class="cls-7" d="M 27.78 310.858 C 27.097 310.495 26.526 309.952 26.13 309.288 C 25.317 307.88 25.317 306.146 26.13 304.738 C 26.526 304.074 27.097 303.531 27.78 303.168 C 29.148 302.486 30.743 302.424 32.16 302.998 C 32.742 303.247 33.256 303.631 33.66 304.118 L 32.39 305.288 C 31.868 304.644 31.079 304.275 30.25 304.288 C 29.758 304.277 29.272 304.394 28.84 304.628 C 28.418 304.859 28.071 305.206 27.84 305.628 C 27.604 306.064 27.483 306.553 27.49 307.048 C 27.483 307.54 27.604 308.026 27.84 308.458 C 28.068 308.882 28.416 309.23 28.84 309.458 C 29.272 309.692 29.758 309.809 30.25 309.798 C 31.08 309.814 31.87 309.445 32.39 308.798 L 33.66 309.968 C 33.258 310.467 32.74 310.858 32.15 311.108 C 31.517 311.374 30.836 311.507 30.15 311.498 C 29.318 311.489 28.503 311.269 27.78 310.858 Z"/>
  <path class="cls-7" d="M 35.88 310.938 C 35.348 310.667 34.904 310.251 34.6 309.738 C 33.598 308.101 34.184 305.957 35.88 305.058 C 36.455 304.764 37.094 304.616 37.74 304.628 C 38.383 304.615 39.019 304.763 39.59 305.058 C 40.12 305.332 40.563 305.747 40.87 306.258 C 41.496 307.334 41.496 308.662 40.87 309.738 C 40.568 310.253 40.124 310.67 39.59 310.938 C 39.02 311.237 38.384 311.388 37.74 311.378 C 37.093 311.387 36.454 311.235 35.88 310.938 Z M 38.96 309.318 C 39.291 308.961 39.46 308.484 39.43 307.998 C 39.457 307.513 39.288 307.037 38.96 306.678 C 38.294 306.022 37.226 306.022 36.56 306.678 C 36.23 307.036 36.057 307.511 36.08 307.998 C 36.052 308.485 36.226 308.962 36.56 309.318 C 37.221 309.985 38.299 309.985 38.96 309.318 Z"/>
  <path class="cls-7" d="M 49.28 302.238 L 49.28 311.238 L 47.46 311.238 L 47.46 310.478 C 46.96 311.055 46.223 311.372 45.46 311.338 C 44.873 311.346 44.294 311.202 43.78 310.918 C 43.283 310.648 42.876 310.237 42.61 309.738 C 42.313 309.193 42.164 308.579 42.18 307.958 C 42.167 307.337 42.315 306.724 42.61 306.178 C 42.881 305.682 43.287 305.273 43.78 304.998 C 44.297 304.722 44.874 304.581 45.46 304.588 C 46.212 304.535 46.947 304.826 47.46 305.378 L 47.46 302.198 L 49.28 302.238 Z M 46.96 309.318 C 47.291 308.961 47.46 308.484 47.43 307.998 C 47.457 307.513 47.288 307.037 46.96 306.678 C 46.294 306.022 45.226 306.022 44.56 306.678 C 44.23 307.036 44.057 307.511 44.08 307.998 C 44.052 308.485 44.226 308.962 44.56 309.318 C 45.221 309.985 46.299 309.985 46.96 309.318 Z"/>
  <path class="cls-7" d="M 57.42 308.538 L 52.42 308.538 C 52.49 308.941 52.716 309.301 53.05 309.538 C 53.415 309.784 53.85 309.907 54.29 309.888 C 54.6 309.894 54.908 309.843 55.2 309.738 C 55.476 309.629 55.728 309.465 55.94 309.258 L 56.94 310.358 C 56.239 311.096 55.246 311.484 54.23 311.418 C 53.538 311.435 52.851 311.284 52.23 310.978 C 51.686 310.714 51.231 310.297 50.92 309.778 C 50.604 309.253 50.442 308.65 50.45 308.038 C 50.444 307.43 50.603 306.832 50.91 306.308 C 51.209 305.795 51.646 305.376 52.17 305.098 C 52.717 304.805 53.33 304.657 53.95 304.668 C 54.555 304.661 55.152 304.802 55.69 305.078 C 56.205 305.35 56.632 305.762 56.92 306.268 C 57.221 306.819 57.372 307.44 57.36 308.068 C 57.36 308.068 57.44 308.218 57.42 308.538 Z M 52.96 306.428 C 52.663 306.683 52.471 307.04 52.42 307.428 L 55.66 307.428 C 55.615 307.04 55.426 306.683 55.13 306.428 C 54.827 306.177 54.443 306.045 54.05 306.058 C 53.654 306.046 53.267 306.177 52.96 306.428 Z"/>
  <path class="cls-7" d="M 67.15 305.348 C 67.725 305.926 68.02 306.725 67.96 307.538 L 67.96 311.278 L 66.19 311.278 L 66.19 310.458 C 65.746 311.112 64.976 311.466 64.19 311.378 C 63.74 311.388 63.292 311.299 62.88 311.118 C 62.533 310.969 62.238 310.723 62.03 310.408 C 61.841 310.109 61.74 309.762 61.74 309.408 C 61.718 308.843 61.976 308.305 62.43 307.968 C 63.063 307.573 63.806 307.391 64.55 307.448 L 66.06 307.448 C 66.094 307.076 65.958 306.709 65.69 306.448 C 65.362 306.205 64.957 306.087 64.55 306.118 C 64.21 306.12 63.873 306.174 63.55 306.278 C 63.242 306.375 62.953 306.527 62.7 306.728 L 61.96 305.418 C 62.352 305.15 62.789 304.953 63.25 304.838 C 63.751 304.698 64.269 304.627 64.79 304.628 C 65.639 304.569 66.479 304.825 67.15 305.348 Z M 65.53 309.868 C 65.78 309.719 65.969 309.485 66.06 309.208 L 66.06 308.538 L 64.76 308.538 C 63.98 308.538 63.59 308.788 63.59 309.308 C 63.588 309.537 63.696 309.753 63.88 309.888 C 64.111 310.04 64.384 310.113 64.66 310.098 C 64.966 310.103 65.267 310.023 65.53 309.868 Z"/>
  <path class="cls-7" d="M 71.04 310.938 C 70.499 310.674 70.047 310.257 69.74 309.738 C 68.728 308.097 69.326 305.942 71.04 305.058 C 71.639 304.774 72.298 304.644 72.96 304.678 C 73.59 304.661 74.214 304.809 74.77 305.108 C 75.275 305.383 75.673 305.82 75.9 306.348 L 74.42 307.138 C 74.145 306.579 73.573 306.228 72.95 306.238 C 72.491 306.222 72.047 306.396 71.72 306.718 C 71.067 307.484 71.067 308.612 71.72 309.378 C 72.042 309.708 72.489 309.886 72.95 309.868 C 73.574 309.883 74.149 309.531 74.42 308.968 L 75.9 309.768 C 75.666 310.287 75.269 310.715 74.77 310.988 C 74.215 311.29 73.591 311.442 72.96 311.428 C 72.289 311.428 71.629 311.26 71.04 310.938 Z"/>
  <path class="cls-7" d="M 77.05 303.508 C 76.835 303.314 76.715 303.037 76.72 302.748 C 76.718 302.462 76.838 302.189 77.05 301.998 C 77.28 301.785 77.587 301.673 77.9 301.688 C 78.214 301.674 78.522 301.782 78.76 301.988 C 78.976 302.168 79.097 302.437 79.09 302.718 C 79.101 303.014 78.98 303.3 78.76 303.498 C 78.525 303.711 78.216 303.822 77.9 303.808 C 77.589 303.821 77.284 303.714 77.05 303.508 Z M 76.95 304.728 L 78.85 304.728 L 78.85 311.278 L 76.96 311.278 L 76.95 304.728 Z"/>
  <path class="cls-7" d="M 90.96 305.348 C 91.48 305.95 91.739 306.735 91.68 307.528 L 91.68 311.278 L 89.78 311.278 L 89.78 307.818 C 89.811 307.406 89.698 306.996 89.46 306.658 C 89.231 306.392 88.891 306.248 88.54 306.268 C 88.139 306.25 87.75 306.411 87.48 306.708 C 87.193 307.07 87.054 307.527 87.09 307.988 L 87.09 311.278 L 85.19 311.278 L 85.19 307.818 C 85.19 306.818 84.78 306.268 83.95 306.268 C 83.569 306.266 83.206 306.426 82.95 306.708 C 82.663 307.07 82.524 307.527 82.56 307.988 L 82.56 311.278 L 80.66 311.278 L 80.66 304.728 L 82.48 304.728 L 82.48 305.478 C 82.724 305.202 83.028 304.986 83.37 304.848 C 83.738 304.696 84.132 304.622 84.53 304.628 C 84.965 304.621 85.396 304.714 85.79 304.898 C 86.155 305.08 86.466 305.356 86.69 305.698 C 86.957 305.36 87.299 305.089 87.69 304.908 C 88.111 304.718 88.568 304.622 89.03 304.628 C 89.744 304.6 90.439 304.86 90.96 305.348 Z"/>
  <path class="cls-7" d="M 98.38 305.348 C 98.962 305.922 99.262 306.723 99.2 307.538 L 99.2 311.278 L 97.42 311.278 L 97.42 310.458 C 96.976 311.112 96.206 311.466 95.42 311.378 C 94.97 311.387 94.523 311.298 94.11 311.118 C 93.764 310.972 93.472 310.724 93.27 310.408 C 93.073 310.112 92.969 309.764 92.97 309.408 C 92.948 308.843 93.206 308.305 93.66 307.968 C 94.297 307.572 95.043 307.39 95.79 307.448 L 97.3 307.448 C 97.331 307.074 97.191 306.707 96.92 306.448 C 96.595 306.205 96.194 306.088 95.79 306.118 C 95.45 306.119 95.113 306.173 94.79 306.278 C 94.478 306.372 94.186 306.525 93.93 306.728 L 93.25 305.398 C 93.638 305.128 94.072 304.932 94.53 304.818 C 95.031 304.678 95.549 304.607 96.07 304.608 C 96.905 304.563 97.727 304.827 98.38 305.348 Z M 96.76 309.868 C 97.011 309.717 97.201 309.484 97.3 309.208 L 97.3 308.538 L 95.96 308.538 C 95.18 308.538 94.79 308.788 94.79 309.308 C 94.788 309.537 94.896 309.753 95.08 309.888 C 95.314 310.041 95.591 310.115 95.87 310.098 C 96.182 310.107 96.491 310.027 96.76 309.868 Z"/>
  <path class="cls-7" d="M 109.9 305.048 C 110.393 305.323 110.799 305.732 111.07 306.228 C 111.366 306.77 111.514 307.38 111.5 307.998 C 111.517 308.616 111.369 309.227 111.07 309.768 C 110.8 310.267 110.395 310.68 109.9 310.958 C 109.392 311.239 108.82 311.384 108.24 311.378 C 107.488 311.421 106.755 311.128 106.24 310.578 L 106.24 313.678 L 104.34 313.678 L 104.34 304.768 L 106.16 304.768 L 106.16 305.518 C 106.675 304.927 107.438 304.613 108.22 304.668 C 108.804 304.647 109.383 304.778 109.9 305.048 Z M 109.11 309.318 C 109.437 308.958 109.606 308.483 109.58 307.998 C 109.602 307.513 109.434 307.039 109.11 306.678 C 108.797 306.353 108.361 306.175 107.91 306.188 C 107.458 306.171 107.021 306.349 106.71 306.678 C 106.382 307.037 106.213 307.513 106.24 307.998 C 106.21 308.484 106.379 308.961 106.71 309.318 C 107.02 309.649 107.457 309.831 107.91 309.818 C 108.362 309.827 108.798 309.646 109.11 309.318 Z"/>
  <path class="cls-7" d="M 117.64 305.348 C 118.219 305.924 118.518 306.724 118.46 307.538 L 118.46 311.278 L 116.68 311.278 L 116.68 310.458 C 116.236 311.112 115.466 311.466 114.68 311.378 C 114.23 311.387 113.783 311.298 113.37 311.118 C 113.023 310.969 112.728 310.723 112.52 310.408 C 112.331 310.109 112.23 309.762 112.23 309.408 C 112.208 308.843 112.466 308.305 112.92 307.968 C 113.553 307.573 114.296 307.391 115.04 307.448 L 116.55 307.448 C 116.584 307.076 116.448 306.709 116.18 306.448 C 115.852 306.204 115.447 306.087 115.04 306.118 C 114.7 306.12 114.363 306.174 114.04 306.278 C 113.732 306.375 113.443 306.527 113.19 306.728 L 112.5 305.398 C 112.892 305.13 113.329 304.933 113.79 304.818 C 114.291 304.678 114.809 304.607 115.33 304.608 C 116.164 304.565 116.986 304.828 117.64 305.348 Z M 116.02 309.868 C 116.27 309.719 116.459 309.485 116.55 309.208 L 116.55 308.538 L 115.25 308.538 C 114.47 308.538 114.08 308.788 114.08 309.308 C 114.078 309.537 114.186 309.753 114.37 309.888 C 114.601 310.04 114.874 310.113 115.15 310.098 C 115.456 310.103 115.757 310.023 116.02 309.868 Z"/>
  <path class="cls-7" d="M 122.96 304.868 C 123.383 304.701 123.835 304.619 124.29 304.628 L 124.29 306.378 L 123.86 306.378 C 123.393 306.35 122.935 306.513 122.59 306.828 C 122.253 307.205 122.084 307.703 122.12 308.208 L 122.12 311.298 L 120.22 311.298 L 120.22 304.748 L 121.96 304.748 L 121.96 305.608 C 122.206 305.261 122.556 305.002 122.96 304.868 Z"/>
  <path class="cls-7" d="M 130.32 305.348 C 130.899 305.924 131.198 306.724 131.14 307.538 L 131.14 311.278 L 129.36 311.278 L 129.36 310.458 C 128.916 311.112 128.146 311.466 127.36 311.378 C 126.91 311.387 126.463 311.298 126.05 311.118 C 125.703 310.969 125.408 310.723 125.2 310.408 C 125.011 310.109 124.91 309.762 124.91 309.408 C 124.888 308.843 125.146 308.305 125.6 307.968 C 126.233 307.573 126.976 307.391 127.72 307.448 L 129.23 307.448 C 129.264 307.076 129.128 306.709 128.86 306.448 C 128.532 306.204 128.127 306.087 127.72 306.118 C 127.38 306.12 127.043 306.174 126.72 306.278 C 126.412 306.375 126.123 306.527 125.87 306.728 L 125.18 305.398 C 125.572 305.13 126.009 304.933 126.47 304.818 C 126.958 304.706 127.459 304.659 127.96 304.678 C 128.802 304.603 129.643 304.841 130.32 305.348 Z M 128.7 309.868 C 128.95 309.719 129.139 309.485 129.23 309.208 L 129.23 308.538 L 127.96 308.538 C 127.18 308.538 126.79 308.788 126.79 309.308 C 126.788 309.537 126.896 309.753 127.08 309.888 C 127.311 310.04 127.584 310.113 127.86 310.098 C 128.155 310.097 128.445 310.018 128.7 309.868 Z"/>
  <path class="cls-7" d="M 141.28 305.348 C 141.862 305.922 142.162 306.723 142.1 307.538 L 142.1 311.278 L 140.32 311.278 L 140.32 310.458 C 139.877 311.114 139.106 311.469 138.32 311.378 C 137.87 311.387 137.423 311.298 137.01 311.118 C 136.664 310.972 136.372 310.724 136.17 310.408 C 135.973 310.112 135.869 309.764 135.87 309.408 C 135.848 308.843 136.106 308.305 136.56 307.968 C 137.197 307.572 137.943 307.39 138.69 307.448 L 140.2 307.448 C 140.231 307.074 140.091 306.707 139.82 306.448 C 139.495 306.205 139.094 306.088 138.69 306.118 C 138.35 306.119 138.013 306.173 137.69 306.278 C 137.378 306.372 137.086 306.525 136.83 306.728 L 136.15 305.398 C 136.538 305.128 136.972 304.932 137.43 304.818 C 137.931 304.703 138.446 304.656 138.96 304.678 C 139.789 304.611 140.614 304.849 141.28 305.348 Z M 139.66 309.868 C 139.911 309.717 140.101 309.484 140.2 309.208 L 140.2 308.538 L 138.89 308.538 C 138.11 308.538 137.72 308.788 137.72 309.308 C 137.718 309.537 137.826 309.753 138.01 309.888 C 138.244 310.041 138.521 310.115 138.8 310.098 C 139.102 310.102 139.4 310.022 139.66 309.868 Z"/>
  <path class="cls-7" d="M 149.35 305.048 C 149.847 305.322 150.256 305.731 150.53 306.228 C 150.818 306.773 150.963 307.382 150.95 307.998 C 150.966 308.614 150.821 309.224 150.53 309.768 C 150.255 310.266 149.846 310.678 149.35 310.958 C 148.843 311.24 148.27 311.385 147.69 311.378 C 146.907 311.428 146.145 311.11 145.63 310.518 L 145.63 311.278 L 143.82 311.278 L 143.82 302.278 L 145.72 302.278 L 145.72 305.458 C 146.234 304.907 146.968 304.617 147.72 304.668 C 148.287 304.654 148.848 304.785 149.35 305.048 Z M 148.56 309.318 C 148.887 308.958 149.056 308.483 149.03 307.998 C 149.052 307.513 148.884 307.039 148.56 306.678 C 147.894 306.022 146.826 306.022 146.16 306.678 C 145.836 307.039 145.668 307.513 145.69 307.998 C 145.664 308.483 145.833 308.958 146.16 309.318 C 146.821 309.985 147.899 309.985 148.56 309.318 Z"/>
  <path class="cls-7" d="M 154.96 304.868 C 155.387 304.701 155.842 304.619 156.3 304.628 L 156.3 306.378 L 155.87 306.378 C 155.4 306.352 154.94 306.514 154.59 306.828 C 154.257 307.207 154.091 307.705 154.13 308.208 L 154.13 311.298 L 152.23 311.298 L 152.23 304.748 L 154.04 304.748 L 154.04 305.608 C 154.27 305.279 154.589 305.023 154.96 304.868 Z"/>
  <path class="cls-7" d="M 157.52 303.508 C 157.305 303.314 157.185 303.037 157.19 302.748 C 157.188 302.462 157.308 302.189 157.52 301.998 C 157.75 301.785 158.057 301.673 158.37 301.688 C 158.681 301.675 158.986 301.782 159.22 301.988 C 159.436 302.168 159.557 302.437 159.55 302.718 C 159.561 303.014 159.44 303.3 159.22 303.498 C 158.99 303.711 158.683 303.823 158.37 303.808 C 158.059 303.821 157.754 303.714 157.52 303.508 Z M 157.42 304.728 L 159.32 304.728 L 159.32 311.278 L 157.42 311.278 L 157.42 304.728 Z"/>
  <path class="cls-7" d="M 163.82 304.868 C 164.243 304.702 164.695 304.62 165.15 304.628 L 165.15 306.378 L 164.73 306.378 C 164.26 306.352 163.8 306.514 163.45 306.828 C 163.117 307.207 162.951 307.705 162.99 308.208 L 162.99 311.298 L 161.09 311.298 L 161.09 304.748 L 162.9 304.748 L 162.9 305.608 C 163.13 305.279 163.449 305.023 163.82 304.868 Z"/>
  <path class="cls-7" d="M 47.62 319.338 L 47.62 325.898 L 45.81 325.898 L 45.81 325.118 C 45.562 325.398 45.254 325.62 44.91 325.768 C 44.552 325.917 44.168 325.992 43.78 325.988 C 43.042 326.016 42.322 325.75 41.78 325.248 C 41.245 324.645 40.974 323.852 41.03 323.048 L 41.03 319.338 L 42.93 319.338 L 42.93 322.768 C 42.93 323.818 43.37 324.348 44.25 324.348 C 44.663 324.366 45.063 324.206 45.35 323.908 C 45.655 323.535 45.806 323.059 45.77 322.578 L 45.77 319.338 L 47.62 319.338 Z"/>
  <path class="cls-7" d="M 59.73 319.968 C 60.251 320.566 60.513 321.347 60.46 322.138 L 60.46 325.898 L 58.55 325.898 L 58.55 322.438 C 58.584 322.023 58.47 321.609 58.23 321.268 C 57.998 321.007 57.659 320.867 57.31 320.888 C 56.911 320.873 56.525 321.029 56.25 321.318 C 55.965 321.685 55.826 322.145 55.86 322.608 L 55.86 325.898 L 53.96 325.898 L 53.96 322.438 C 53.96 321.438 53.55 320.888 52.72 320.888 C 52.342 320.887 51.98 321.043 51.72 321.318 C 51.435 321.685 51.296 322.145 51.33 322.608 L 51.33 325.898 L 49.43 325.898 L 49.43 319.338 L 51.25 319.338 L 51.25 320.098 C 51.493 319.819 51.798 319.599 52.14 319.458 C 52.513 319.315 52.91 319.243 53.31 319.248 C 53.742 319.241 54.169 319.334 54.56 319.518 C 54.927 319.698 55.239 319.974 55.46 320.318 C 55.724 319.977 56.067 319.706 56.46 319.528 C 56.884 319.337 57.345 319.241 57.81 319.248 C 58.521 319.218 59.214 319.478 59.73 319.968 Z"/>
  <path class="cls-7" d="M 66.89 325.558 C 64.627 324.387 64.48 321.206 66.625 319.831 C 66.711 319.776 66.799 319.725 66.89 319.678 C 67.472 319.383 68.118 319.236 68.77 319.248 C 69.401 319.23 70.025 319.378 70.58 319.678 C 71.082 319.952 71.479 320.384 71.71 320.908 L 70.24 321.708 C 69.962 321.147 69.386 320.797 68.76 320.808 C 68.302 320.796 67.859 320.969 67.53 321.288 C 66.877 322.054 66.877 323.182 67.53 323.948 C 67.859 324.267 68.302 324.44 68.76 324.428 C 69.388 324.447 69.968 324.094 70.24 323.528 L 71.71 324.338 C 71.473 324.855 71.077 325.283 70.58 325.558 C 70.025 325.858 69.401 326.006 68.77 325.988 C 68.118 326 67.472 325.853 66.89 325.558 Z"/>
  <path class="cls-7" d="M 78.71 319.978 C 79.247 320.564 79.519 321.345 79.46 322.138 L 79.46 325.898 L 77.56 325.898 L 77.56 322.438 C 77.589 322.02 77.468 321.605 77.22 321.268 C 76.958 321.001 76.593 320.863 76.22 320.888 C 75.792 320.87 75.376 321.029 75.07 321.328 C 74.763 321.708 74.616 322.192 74.66 322.678 L 74.66 325.918 L 72.76 325.918 L 72.76 316.918 L 74.66 316.918 L 74.66 320.088 C 74.914 319.826 75.225 319.627 75.57 319.508 C 75.944 319.369 76.341 319.301 76.74 319.308 C 77.46 319.259 78.169 319.5 78.71 319.978 Z"/>
  <path class="cls-7" d="M 86.16 319.968 C 86.738 320.544 87.035 321.344 86.97 322.158 L 86.97 325.898 L 85.19 325.898 L 85.19 325.078 C 84.748 325.734 83.975 326.085 83.19 325.988 C 82.74 326.001 82.293 325.916 81.88 325.738 C 81.535 325.586 81.241 325.34 81.03 325.028 C 80.841 324.729 80.74 324.382 80.74 324.028 C 80.718 323.463 80.976 322.925 81.43 322.588 C 82.063 322.192 82.806 322.009 83.55 322.068 L 85.06 322.068 C 85.098 321.695 84.961 321.326 84.69 321.068 C 84.362 320.825 83.957 320.707 83.55 320.738 C 83.21 320.74 82.873 320.794 82.55 320.898 C 82.239 320.997 81.948 321.149 81.69 321.348 L 80.96 320.038 C 81.354 319.771 81.79 319.571 82.25 319.448 C 82.752 319.311 83.27 319.244 83.79 319.248 C 84.642 319.186 85.486 319.443 86.16 319.968 Z M 84.54 324.488 C 84.79 324.339 84.979 324.105 85.07 323.828 L 85.07 323.158 L 83.77 323.158 C 82.99 323.158 82.6 323.408 82.6 323.918 C 82.592 324.148 82.701 324.366 82.89 324.498 C 83.12 324.653 83.393 324.73 83.67 324.718 C 83.976 324.723 84.277 324.643 84.54 324.488 Z"/>
  <path class="cls-7" d="M 99.04 319.968 C 99.557 320.568 99.816 321.348 99.76 322.138 L 99.76 325.898 L 97.86 325.898 L 97.86 322.438 C 97.889 322.023 97.777 321.61 97.54 321.268 C 97.308 321.007 96.969 320.867 96.62 320.888 C 96.221 320.871 95.834 321.028 95.56 321.318 C 95.275 321.685 95.136 322.145 95.17 322.608 L 95.17 325.898 L 93.27 325.898 L 93.27 322.438 C 93.27 321.438 92.86 320.888 92.03 320.888 C 91.652 320.887 91.29 321.043 91.03 321.318 C 90.745 321.685 90.606 322.145 90.64 322.608 L 90.64 325.898 L 88.74 325.898 L 88.74 319.338 L 90.56 319.338 L 90.56 320.098 C 90.803 319.819 91.108 319.599 91.45 319.458 C 91.82 319.315 92.213 319.243 92.61 319.248 C 93.045 319.24 93.476 319.333 93.87 319.518 C 94.237 319.698 94.549 319.974 94.77 320.318 C 95.034 319.977 95.377 319.706 95.77 319.528 C 96.191 319.338 96.648 319.242 97.11 319.248 C 97.824 319.219 98.519 319.479 99.04 319.968 Z"/>
  <path class="cls-7" d="M 106.45 319.968 C 107.036 320.54 107.336 321.342 107.27 322.158 L 107.27 325.898 L 105.49 325.898 L 105.49 325.078 C 105.043 325.728 104.274 326.078 103.49 325.988 C 103.04 326 102.594 325.914 102.18 325.738 C 101.836 325.589 101.544 325.342 101.34 325.028 C 101.143 324.732 101.039 324.384 101.04 324.028 C 101.018 323.463 101.276 322.925 101.73 322.588 C 102.367 322.192 103.113 322.01 103.86 322.068 L 105.37 322.068 C 105.406 321.694 105.265 321.324 104.99 321.068 C 104.665 320.825 104.264 320.708 103.86 320.738 C 103.52 320.739 103.183 320.793 102.86 320.898 C 102.548 320.992 102.256 321.145 102 321.348 L 101.32 320.018 C 101.709 319.749 102.142 319.549 102.6 319.428 C 103.102 319.291 103.62 319.224 104.14 319.228 C 104.975 319.183 105.797 319.447 106.45 319.968 Z M 104.83 324.488 C 105.081 324.337 105.271 324.104 105.37 323.828 L 105.37 323.158 L 104.06 323.158 C 103.28 323.158 102.89 323.408 102.89 323.918 C 102.882 324.148 102.991 324.366 103.18 324.498 C 103.413 324.655 103.69 324.732 103.97 324.718 C 104.272 324.722 104.57 324.642 104.83 324.488 Z"/>
  <path class="cls-7" d="M 115.73 316.858 L 115.73 325.858 L 113.96 325.858 L 113.96 325.098 C 113.457 325.67 112.721 325.983 111.96 325.948 C 111.377 325.96 110.801 325.819 110.29 325.538 C 109.793 325.264 109.384 324.855 109.11 324.358 C 108.537 323.241 108.537 321.915 109.11 320.798 C 109.384 320.301 109.793 319.892 110.29 319.618 C 110.801 319.337 111.377 319.196 111.96 319.208 C 112.712 319.154 113.448 319.444 113.96 319.998 L 113.96 316.818 L 115.73 316.858 Z M 113.39 323.938 C 114.028 323.174 114.028 322.062 113.39 321.298 C 113.082 320.971 112.649 320.792 112.2 320.808 C 111.746 320.793 111.306 320.971 110.99 321.298 C 110.364 322.067 110.364 323.169 110.99 323.938 C 111.306 324.265 111.746 324.443 112.2 324.428 C 112.649 324.444 113.082 324.265 113.39 323.938 Z"/>
  <path class="cls-7" d="M 118.75 325.558 C 116.487 324.371 116.358 321.179 118.517 319.812 C 118.593 319.764 118.671 319.72 118.75 319.678 C 119.92 319.105 121.29 319.105 122.46 319.678 C 122.987 319.952 123.427 320.368 123.73 320.878 C 124.356 321.954 124.356 323.282 123.73 324.358 C 123.427 324.868 122.987 325.284 122.46 325.558 C 121.29 326.131 119.92 326.131 118.75 325.558 Z M 121.75 323.938 C 122.376 323.169 122.376 322.067 121.75 321.298 C 121.442 320.971 121.009 320.792 120.56 320.808 C 120.106 320.793 119.666 320.971 119.35 321.298 C 118.708 322.061 118.708 323.175 119.35 323.938 C 119.666 324.265 120.106 324.443 120.56 324.428 C 121.026 324.458 121.481 324.279 121.8 323.938 L 121.75 323.938 Z"/>
  <path class="cls-7" d="M 125.26 325.678 C 125.032 325.455 124.908 325.147 124.92 324.828 C 124.907 324.509 125.031 324.2 125.26 323.978 C 125.738 323.55 126.462 323.55 126.94 323.978 C 127.169 324.2 127.293 324.509 127.28 324.828 C 127.263 325.744 126.261 326.298 125.477 325.826 C 125.406 325.784 125.34 325.734 125.28 325.678 L 125.26 325.678 Z"/>
</svg>
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