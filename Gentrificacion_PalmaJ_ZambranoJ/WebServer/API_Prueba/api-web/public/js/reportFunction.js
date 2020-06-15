// ******* MAPA DESPLEGADO AL INICIO **********


var mapa;
var vista;
var arreglo;
var legend, legend2, legend3, legend4, legend5, legend6, legend7, legend8, legend9;
var swipe1, swipe2, swipe3, swipe4;
// Varaibles para Capas
var capaInicial;
var atributo, atributo1;
var data;
var capaBarriosSector, capaResultados2010, capaResultados2001, capaResultados1990, capaGentri1, capaGentri2,
    capaGentri3, capaGentri4, capaGentri5, capaGentri6;
//Variables de features
var FeatureLayerRico;
//PopUps
var popUp1;
var popUp2;
var evento;
var json1, json2;
var myBarChart, myPieChart, myDonutChart, myPieChart1, myDonutChart1, myDoubleBarChart, myDoubleBarChart1,
    myDoubleBarChart2, myDoubleBarChart3, myDoubleBarChart4,myDoubleBarChart5,myDoubleBarChart6,myDoubleBarChart7,canvasMapa,nombreBarrio,nombreBarrio1;
var datagrafico1=[];
var datagrafico2=[];
var backGroundColor1=[];
var backGroundColor2=[];
var bordercolorgrafico=[];
var borderwidthgraifoc=[];
var labelsgrafico=[];
//variables que cambian de acuerdo a la seleccion
var canvasGraficoDobleBarra,canvas2,canvas3,canvas4,estadoGent1,estadoGent2,canvasgraficoCVReporte,canvasgraficoAniosReporte,canvasgraficoEmpReporte,canvasgraficoEmpGReporte,canvasgraficoESReporte,canvasgraficoGEReporte;
var resultadosquery1,resultadosquery2;
require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/tasks/support/Query",
        "esri/widgets/Legend",
        "esri/widgets/Swipe",
        "esri/views/ui/DefaultUI",
        "esri/tasks/QueryTask",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js",
        "dojo/domReady!"

    ],
    function (Map, MapView, FeatureLayer, Query, Legend, Swipe, QueryTask, Chart) {
        FeatureLayerRico = FeatureLayer;
        SwipeRico = Swipe;
        Leyenda = Legend;
        QueryR = Query;
        //Llamada al mapa base
        const map = new Map({
            basemap: "streets"
        });
        popUp1={
            "title": "BARRIO",
            "content": function () {
                return "Nombre: {NOMBRE}";
            }
        }

        capaInicial = new FeatureLayer({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer",
            opacity: 1.0,
            outFields:['NOMBRE'],
            popupTemplate:popUp1

        });

        map.basemap = "gray";
        map.layers.add(capaInicial);

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-78.5155452, -0.2220584], // longitude, latitude
            zoom: 15,
            popup: {

                visible: false,
                dockOptions: {
                    buttonEnabled: true,
                    breakpoint: false

                }
            }
        });

        mapa = map;
        vista = view;

        legend = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaInicial,
                    title: "Barrios - Centro Histórico"
                }
            ]
        });

        view.ui.add(legend, "bottom-right");
        if (evento) {
            evento.remove();
        }
        var query = new QueryR();
        query.outFields = ["BARRIO_ID"];
        query.where = "1=1";
        query.num = 50;

        // On view click, query the feature layer and pass the results to crearGraficoBarras function.

        evento = vista.on("click", (e) => {
            query.geometry = e.mapPoint;


            capaInicial.queryFeatures(query).then((results1) => {



                }
            );




        });



    });



//******** LLAMADA A NUEVAS CAPAS ***********
function cambioCapa(arreglo) {

    vista.ui.remove(swipe1);
    vista.ui.remove(swipe2);
    vista.ui.remove(swipe3);
    vista.ui.remove(swipe4);
    vista.ui.remove(legend);
    vista.ui.remove(legend2);
    vista.ui.remove(legend3);
    vista.ui.remove(legend4);
    vista.ui.remove(legend5);
    vista.ui.remove(legend6);
    vista.ui.remove(legend7);
    vista.ui.remove(legend8);
    vista.ui.remove(legend9);

    mapa.removeAll();
    destruirGraficos();
    console.log("recibi mi arreglo " + arreglo);
    if (arreglo == "6") {
        capaGentri5 = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_1990_f/FeatureServer",
            opacity: 0.9
        });
        capaGentri6 = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2001_f/FeatureServer",
            opacity: 0.9
        });

        swipe3 = new SwipeRico({
            view: vista,
            leadingLayers: [capaGentri5],
            trailingLayers: [capaGentri6],
            position: 50,
            state: "ready"

        });

        legend6 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri5,
                    title: "Gentrificación Barrios 1990"
                }
            ]
        });
        legend7 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri6,
                    title: "Gentrificación Barrios 2001"
                }
            ]
        });


        mapa.add(capaInicial);
        alistarGentrificacionBarrios(capaGentri5, capaGentri6, "1990", "2001");
    } else if (arreglo == "7") {
        capaGentri7 = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2001_f/FeatureServer",
            opacity: 0.9
        });
        capaGentri8 = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2010_f/FeatureServer",
            opacity: 0.9
        });

        swipe4 = new SwipeRico({
            view: vista,
            leadingLayers: [capaGentri7],
            trailingLayers: [capaGentri8],
            position: 50,
            state: "ready"

        });

        legend8 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri7,
                    title: "Gentrificación Barrios 2001"
                }
            ]
        });
        legend9 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri8,
                    title: "Gentrificación Barrios 2010"
                }
            ]
        });



        mapa.add(capaInicial);
        alistarGentrificacionBarrios(capaGentri7, capaGentri8, "2001", "2010");

    }

}
function crearGraficoPie(results) {
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico2');

    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets: [{
            label: 'Total',
            data: [((results.T_PE_EM_S / results.T_PE_S) * 100).toFixed(2), (((results.T_PE_S - results.T_PE_EM_S) / results.T_PE_S) * 100).toFixed(2)],
            backgroundColor: ["#145251", "#0b182d"]
        }],

        labels: [
            "% Personas con empleo ", "% Personas sin empleo"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if (myPieChart) {
        myPieChart.destroy();
    }

    myPieChart = new Chart(canvas, {
        type: 'pie',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }
            },

            responsive: true,
            maintainAspectRatio: true,
            title: {display: true, text: 'Condición laboral del sector', fontSize: 18, fontColor: "#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}

function crearGraficoDona(results) {
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico3');

    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets: [{
            label: 'Total',
            data: [((results.T_PE_EG_S / results.T_PE_EM_S) * 100).toFixed(2), (((results.T_PE_EM_S - results.T_PE_EG_S) / results.T_PE_EM_S) * 100).toFixed(2)],
            backgroundColor: ["#0c6a6a", "#d0d317"]
        }],

        labels: [
            "% Personas con empleo T/G/ADM", "% Personas con otro tipo de empleo"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if (myDonutChart) {
        myDonutChart.destroy();
    }

    myDonutChart = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }
            },

            responsive: true,
            maintainAspectRatio: true,
            title: {
                display: true,
                text: 'Condición de tipos de empleo del sector',
                fontSize: 18,
                fontColor: "#fff"
            },
            scaleShowValues: false
        }

    });

    return canvas;
}

function crearGraficoPie1(results) {
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico4');
    canvas.style.visibility = 'visible';
    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets: [{
            label: 'Total',
            data: [((results.T_PE_ES_S / results.T_PE_S) * 100).toFixed(2), (((results.T_PE_S - results.T_PE_ES_S) / results.T_PE_S) * 100).toFixed(2)],
            backgroundColor: ["#f49b2f", "#5c0548"]
        }],

        labels: [
            "% Personas con Educación Superior", "% Personas sin Educación Superior"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if (myPieChart1) {
        myPieChart1.destroy();
    }

    myPieChart1 = new Chart(canvas, {
        type: 'pie',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }
            },

            responsive: true,
            maintainAspectRatio: true,
            title: {display: true, text: 'Escolaridad por sector', fontSize: 18, fontColor: "#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}

function crearGraficoDona1(results) {
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico5');
    canvas.style.visibility = 'visible';
    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets: [{
            label: 'Total',
            data: [((results.T_PE_25_S / results.T_PE_S) * 100).toFixed(2), (((results.T_PE_S - results.T_PE_25_S) / results.T_PE_S) * 100).toFixed(2)],
            backgroundColor: ["#077683", "#f69e51"]
        }],

        labels: [
            "% Personas mayores a 25 años", "% Personas menores a 25 años"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if (myDonutChart1) {
        myDonutChart1.destroy();
    }

    myDonutChart1 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }
            },

            responsive: true,
            maintainAspectRatio: true,
            title: {display: true, text: 'Condición de edad por sector', fontSize: 18, fontColor: "#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}

function mostrarDivs() {
    document.getElementById("content3").style.display = "flex";
    document.getElementById("content4").style.display = "flex";
    document.getElementById("content5").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}

function mostrarDivs1() {
    document.getElementById("content3").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}

function mostrarDivs2() {
    document.getElementById("content4").style.display = "flex";
    document.getElementById("content5").style.display = "flex";
    document.getElementById("content3").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}

function alistar(capa) {
    if (evento) {
        evento.remove();
    }
    //vista.refresh()
    var query = new QueryR();
    query.outFields = ["T_VI_S", "T_PE_S", "T_GENT_S", "T_PE_25_S", "T_PE_ES_S", "T_PE_EM_S", "T_PE_SE_S", "T_PE_EG_S", "PROM_POBR"];
    query.where = "1=1";
    query.num = 50;

    // On view click, query the feature layer and pass the results to crearGraficoBarras function.

    evento = vista.on("click", (e) => {
        query.geometry = e.mapPoint;

        capa.queryFeatures(query).then((results) => {
                mostrarDivs();
                crearGraficoBarras(results.features[0].attributes);
                crearGraficoPie(results.features[0].attributes);
                crearGraficoDona(results.features[0].attributes);
                crearGraficoPie1(results.features[0].attributes);
                crearGraficoDona1(results.features[0].attributes);
            }
        );

    });


}


// On view click, query the feature layer and pass the results to crearGraficoBarras function.


function alistarGentrificacionBarrios(capa, capa1, anio1, anio2) {
    if (evento) {
        evento.remove();
    }
    console.log('entre cargar 2')
    var query = new QueryR();
    query.outFields = ["BARRIO_ID","DESC_FEN","NOMBRE","T_PE_EG_B","T_PE_EM_B","T_PE_GE_B","T_PE_ES_B","T_PE_25_B","P_POBR_B"];
    query.where = "1=1";
    query.num = 50;

    // On view click, query the feature layer and pass the results to crearGraficoBarras function.

    evento = vista.on("click", (e) => {
        query.geometry = e.mapPoint;





        capa.queryFeatures(query).then((results1) => {
                console.log('entre cargar 3')
                capa1.queryFeatures(query).then((results2) => {
                        console.log('entre cargar 4');

                        canvasMapa=cargarMapa(results1.features[0].attributes)
                        nombreBarrio1=pasarNombre(results1.features[0].attributes);
                        nombreBarrio=capLetters_1(nombreBarrio1);
                        estadoGent1=pasarEstado1(results1.features[0].attributes);
                        estadoGent2=pasarEstado2(results2.features[0].attributes);
                        console.log('estadoGent1');
                        console.log(estadoGent1);
                        resultadosquery1=results1.features[0].attributes;
                        resultadosquery2=results2.features[0].attributes;
                        console.log('resultadosquery1');
                        console.log(resultadosquery1);
                        console.log('RESULTS');
                        console.log(results1.features[0].attributes);
                        console.log('resultadosquery2');
                        console.log(resultadosquery2);
                        console.log('RESULTS2');
                        console.log(results2.features[0].attributes);

                        //llenarGrafico(results1.features[0].attributes,results2.features[0].attributes);
                        //console.log('pase LLENAR');
                        //console.log(datagrafico1);
                        //resultadosquery1=results1.features[0].attributes;
                        //resultadosquery2=results1.features[0].attributes
                        //canvasGraficoDobleBarra=crearGraficoDobleBarraReporte(results1.features[0].attributes,results2.features[0].attributes,anio1,anio2,datagrafico1,datagrafico2,backGroundColor1,backGroundColor2,bordercolorgrafico,borderwidthgraifoc,labelsgrafico);







                    }
                );

            }
        );




    });


    // On view click, query the feature layer and pass the results to crearGraficoBarras function.


}


function crearGraficoDobleBarra(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico2');

    var data = {
        datasets: [{
            label: 'Total ' + anio1,
            data: [resultados.T_PE_25_B, resultados.P_POBR_B, resultados.T_PE_GE_B, resultados.T_PE_EM_B, resultados.T_PE_EG_B, resultados.T_PE_ES_B],
            backgroundColor: ["#066F6C", "#066F6C", "#066F6C", "#066F6C", "#066F6C", "#066F6C"],
            borderColor: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
            borderWidth: [1, 1, 1, 1, 1, 1]
        }, {
            label: 'Total ' + anio2,
            data: [resultados1.T_PE_25_B, resultados1.P_POBR_B, resultados1.T_PE_GE_B, resultados1.T_PE_EM_B, resultados1.T_PE_EG_B, resultados1.T_PE_ES_B],
            backgroundColor: ["#f3b309", "#f3b309", "#f3b309", "#f3b309", "#f3b309", "#f3b309"],
            borderColor: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
            borderWidth: [1, 1, 1, 1, 1, 1]
        }],

        labels: [
            "Personas > 25 años", "Cambio de Viviendas", "Personas Gentrificables", "Personas con Empleo", "Personas con Empleo G-T-ADM", "Personas con Educación Superior"

        ], fontColor: "#000000", borderWidth: 2
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart) {

        myDoubleBarChart.destroy();

    }
    myDoubleBarChart = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "#000000",
                    fontSize: 16,
                    borderColor: "#000000",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {display: true, position:'top',text:'Información Censal por Barrio', fontSize: 24, fontColor: "#000000"},
            scaleShowValues: true,
            scales: {
                yAxes: [{

                    gridLines: {color: "#000000"},
                    ticks: {
                        beginAtZero: true,
                        fontColor: "#000000",

                    }
                }],
                xAxes: [{

                    display: true,
                    fontSize: 8,
                    gridLines: {color: "#000000"},
                    ticks: {
                        autoSkip: false,
                        fontColor: "#000000",

                    }
                }]
            }
        }

    });

    return canvas;
}

function alistarGentrificacionSectores(capa, capa1, anio1, anio2) {
    console.log("entre alistar")
    if (evento) {
        evento.remove();
    }

    var query = new QueryR();
    query.outFields = ["T_PE_25_S", "T_PE_ES_S", "T_PE_GE_S", "T_PE_EM_S", "T_PE_EG_S", "PROM_POBR"];
    query.where = "1=1";
    query.num = 50;

    // On view click, query the feature layer and pass the results to crearGraficoBarras function.

    evento = vista.on("click", (e) => {
        query.geometry = e.mapPoint;
        capa.queryFeatures(query).then((results) => {
                console.log("entre query 1")
                json1 = results.features[0].attributes;

                capa1.queryFeatures(query).then((results1) => {

                        json2 = results1.features[0].attributes;
                        console.log("entre query 2");
                        mostrarDivs1();

                        crearGraficoDobleBarraSectores(json1, json2, anio1, anio2);


                    }
                );

            }
        );


    });

}

function crearGraficoDobleBarraSectores(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico1');

    var data = {
        datasets: [{
            label: 'Total ' + anio1,
            data: [resultados.T_PE_25_S, resultados.T_PE_ES_S, resultados.T_PE_GE_S, resultados.T_PE_EM_S, resultados.T_PE_EG_S, resultados.PROM_POBR],
            backgroundColor: ["#066F6C", "#066F6C", "#066F6C", "#066F6C", "#066F6C", "#066F6C"],
            borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
            borderWidth: [1, 1, 1, 1, 1, 1]
        }, {
            label: 'Total ' + anio2,
            data: [resultados1.T_PE_25_S, resultados1.T_PE_ES_S, resultados1.T_PE_GE_S, resultados1.T_PE_EM_S, resultados1.T_PE_EG_S, resultados1.PROM_POBR],
            backgroundColor: ["#f3b309", "#f3b309", "#f3b309", "#f3b309", "#f3b309", "#f3b309"],
            borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
            borderWidth: [1, 1, 1, 1, 1, 1]
        }],

        labels: [
            "Personas > 25 años", "Personas con Educación Superior", "Personas Gentrificables", "Personas con Empleo", "Personas con G-T-ADM", "Cambio Viviendas"

        ], fontColor: "#fff", borderWidth: 2
    }
    console.log("HICE GRAFICO");
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart1) {

        myDoubleBarChart1.destroy();

    }
    myDoubleBarChart1 = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {display: true, text: 'Información Censal por Sector', fontSize: 18, fontColor: "#fff"},
            scaleShowValues: true,
            scales: {
                yAxes: [{

                    gridLines: {color: "white"},
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",

                    }
                }],
                xAxes: [{

                    display: true,
                    fontSize: 8,
                    gridLines: {color: "white"},
                    ticks: {
                        autoSkip: false,
                        fontColor: "white",

                    }
                }]
            }
        }

    });
    console.log("HICE GRAFICO");

    return canvas;
}

//cambiar
function crearGraficoDobleBarraEmpEg(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico4');
    var data = {
        datasets: [{
            label: 'Total ',
            data: [((resultados1.T_PE_EM_B - resultados.T_PE_EM_B)) / 100, ((resultados1.T_PE_EG_B - resultados.T_PE_EG_B)) / 100],
            backgroundColor: ["#d1ffa3", "#005194"],
            borderColor: ["#ffffff", "#ffffff"],
            borderWidth: [1, 1]
        }],

        labels: [
            "Personas con Empleo", "Personas con Empleo Gerencial"

        ], fontColor: "#fff", borderWidth: 2
    }


    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart3) {

        myDoubleBarChart3.destroy();

    }
    myDoubleBarChart3 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {display: true, text: 'Cambio del % de Empleo/Empleo G-T-ADM', fontSize: 18, fontColor: "#fff"},
            scaleShowValues: false


        }

    });

    return canvas;
}

function crearGraficoDoblePobrPGent(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico5');
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);


    var data = {
        datasets: [{
            label: 'Total ' + anio1,
            data: [((resultados1.P_POBR_B - resultados.P_POBR_B)) / 100, ((resultados1.T_PE_GE_B - resultados.T_PE_GE_B)) / 100],
            backgroundColor: ["#af7aff", "#acdf9f"],
            borderColor: ["#ffffff", "#ffffff"],
            borderWidth: [1, 1]
        }],

        labels: [
            "Cambio de vivienda", "Personas Gentrificables"

        ], fontColor: "#fff", borderWidth: 2
    }


    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart4) {

        myDoubleBarChart4.destroy();

    }
    myDoubleBarChart4 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas Gentrificables/Cambios de Vivienda',
                fontSize: 18,
                fontColor: "#fff"
            },
            scaleShowValues: false
        }

    });

    return canvas;
}


function crearGraficoDobleBarraEsMay(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico3');

    var data = {
        datasets: [{
            label: 'Total ' + anio1,
            data: [((resultados1.T_PE_25_B - resultados.T_PE_25_B)) / 100, ((resultados1.T_PE_ES_B - resultados.T_PE_ES_B)) / 100],
            backgroundColor: ["#378e2f", "#f3b309"],
            borderColor: ["#ffffff", "#ffffff"],
            borderWidth: [1, 1]
        }],

        labels: [
            "Personas > 25 Años", "Personas con educación superior"

        ], fontColor: "#fff", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart2) {

        myDoubleBarChart2.destroy();

    }
    myDoubleBarChart2 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Mayores a 25 años/Educación Superior',
                fontSize: 18,
                fontColor: "#fff"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}

function destruirGraficos() {
    if (myDoubleBarChart1) {

        myDoubleBarChart1.destroy();

    }
    if (myDoubleBarChart) {

        myDoubleBarChart.destroy();

    }
    if (myDoubleBarChart2) {

        myDoubleBarChart2.destroy();

    }
    if (myDoubleBarChart3) {

        myDoubleBarChart3.destroy();

    }
    if (myDoubleBarChart4) {

        myDoubleBarChart4.destroy();

    }

    if (myBarChart) {
        myBarChart.destroy();
    }
    if (myDonutChart1) {
        myDonutChart1.destroy();
    }
    if (myPieChart1) {
        myPieChart1.destroy();
    }
    if (myDonutChart) {
        myDonutChart.destroy();
    }
    if (myPieChart) {
        myPieChart.destroy();
    }


}

function graficoPiePrueba(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico3');
    var resultado = (resultados1.T_PE_25_B - resultados.T_PE_25_B) / 100;
    var color;
    if (resultado >= 0) {
        color = "#1af304";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Total ' + anio1,
            data: [(resultados1.T_PE_25_B - resultados.T_PE_25_B) / 100, 100],
            backgroundColor: [color, "#f3b309"],
            borderColor: ["#ffffff", "#ffffff"],
            borderWidth: [1, 1]
        }],

        labels: [
            "Personas > 25 Años", "Personas con educación superior"

        ], fontColor: "#fff", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart2) {

        myDoubleBarChart2.destroy();

    }
    myDoubleBarChart2 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Mayores a 25 años/Educación Superior',
                fontSize: 18,
                fontColor: "#fff"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}

function destruirGraficos() {
    if (myDoubleBarChart1) {

        myDoubleBarChart1.destroy();

    }
    if (myDoubleBarChart) {

        myDoubleBarChart.destroy();

    }
    if (myDoubleBarChart2) {

        myDoubleBarChart2.destroy();

    }
    if (myDoubleBarChart3) {

        myDoubleBarChart3.destroy();

    }
    if (myDoubleBarChart4) {

        myDoubleBarChart4.destroy();

    }

    if (myBarChart) {
        myBarChart.destroy();
    }
    if (myDonutChart1) {
        myDonutChart1.destroy();
    }
    if (myPieChart1) {
        myPieChart1.destroy();
    }
    if (myDonutChart) {
        myDonutChart.destroy();
    }
    if (myPieChart) {
        myPieChart.destroy();
    }


}
function tomaCaptura() {
    var options = {
        format: "png",
        layers: [capaGentri6]

    }
    vista.takeScreenshot(options).then(function (screenshot) {
        var imageElement = document.getElementById("viewDiv");
        imageElement.src = screenshot.dataUrl;
        console.log("AQUI")
        console.log(imageElement)
    });
}
function cargarMapa(results){
    console.log("entre cargar mapa");
    console.log(results)
    var mapa="../images/mapa/"+results.BARRIO_ID+".PNG";
    console.log(mapa);
    var canvas=document.getElementById('grafico1');
    var chart=document.getElementById('chart1');
    var ctx = canvas.getContext("2d");
    var img = new Image();

    console.log("imagen src");
    console.log(img.src);
    img.onload = function() {
        canvas.height=img.height;
        canvas.width=img.width;
        chart.height=img.height;
        chart.width=img.width;
        // get the top left position of the image


        ctx.drawImage(img, 0, 0,canvas.width,canvas.height);

        ctx.beginPath();

        ctx.stroke();
    };
    img.src=mapa;
    return canvas;

    //ctx.drawImage(img, 10, 10);





}
function pasarEstado1(resultados){
    return resultados.DESC_FEN;

}
function pasarEstado2(resultados){
    return resultados.DESC_FEN;

}
function pasarNombre(resultados){
    return resultados.NOMBRE;

}

function crearGraficoDobleBarraReporte(resultados, resultados1, anio1, anio2,data1,data2,background1,background2,bordercolor,borderwidth,labels) {
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico2');
    var ctx = canvas.getContext("2d");
    var data = {
        datasets: [{
            label: 'Total ' + anio1,
            data: data1,
            backgroundColor: background1,
            borderColor: bordercolor,
            borderWidth: borderwidth
        }, {
            label: 'Total ' + anio2,
            data: data2,
            backgroundColor: background2,
            borderColor: bordercolor,
            borderWidth: borderwidth
        }],

        labels: labels, fontColor: "#000000", borderWidth: 2
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart) {

        myDoubleBarChart.destroy();

    }
    myDoubleBarChart = new Chart(canvas, {
        type: 'bar',
        data: data,

        options: {
            "animation": {
                "duration": 0,
                "onComplete": function() {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(25, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            },
            legend: {
                labels: {
                    fontColor: "#000000",
                    fontSize: 25,
                    borderColor: "#000000",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {display: true, position:'top',text:'Información Censal por Barrio', fontSize: 32, fontColor: "#000000"},
            scaleShowValues: true,
            scales: {

                yAxes: [{
                    scaleLabel:{display:true},

                    ticks: {
                        fontSize: 25,
                        beginAtZero: true,
                        fontColor: "#000000",

                    }
                }],
                xAxes: [{

                    display: true,

                    gridLines: {color: "#000000"},
                    ticks: {
                        fontSize: 25,
                        autoSkip: false,
                        fontColor: "#000000",

                    }
                }]
            }
        }

    });

    return canvas;
}


function llenarGrafico(r1,r2){
    datagrafico1.length=0;
    datagrafico2.length=0;
    backGroundColor1.length=0;
    backGroundColor2.length=0;
    bordercolorgrafico.length=0;
    bordercolorgrafico.length=0;
    labelsgrafico.length=0;
    console.log('entreGrafico');
    if (document.getElementById('anios').checked){
        console.log('entre anios');
        datagrafico1.push(r1.T_PE_25_B);
        datagrafico2.push(r2.T_PE_25_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas > a 25 años");



    }
    if (document.getElementById('empleo').checked){
        console.log('entre emp');
        datagrafico1.push(r1.T_PE_EM_B);
        datagrafico2.push(r2.T_PE_EM_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Empleo");


    }
    if (document.getElementById('empleog').checked){
        console.log('entre epmg');
        datagrafico1.push(r1.T_PE_EG_B);
        datagrafico2.push(r2.T_PE_EG_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con empleo G-T-ADM");


    }

    if (document.getElementById('gentrificables').checked){
        console.log('entre gent');
        datagrafico1.push(r1.T_PE_GE_B);
        datagrafico2.push(r2.T_PE_GE_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas gentrificables");


    }

    if (document.getElementById('edusup').checked){
        console.log('entre educ')
        datagrafico1.push(r1.T_PE_ES_B);
        datagrafico2.push(r2.T_PE_ES_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Educación Superior");


    }
    if (document.getElementById('vivienda').checked){
        console.log('entre viv')
        datagrafico1.push(r1.P_POBR_B.toFixed(2));
        datagrafico2.push(r2.P_POBR_B.toFixed(2));
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Cambio Vivienda");


    }
    if (document.getElementById('todas').checked){
        console.log('entre anios');
        datagrafico1.push(r1.T_PE_25_B);
        datagrafico2.push(r2.T_PE_25_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas > a 25 años");
        console.log('entre emp');
        datagrafico1.push(r1.T_PE_EM_B);
        datagrafico2.push(r2.T_PE_EM_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Empleo");
        console.log('entre epmg');
        datagrafico1.push(r1.T_PE_EG_B);
        datagrafico2.push(r2.T_PE_EG_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con empleo G-T-ADM");
        console.log('entre gent');
        datagrafico1.push(r1.T_PE_GE_B);
        datagrafico2.push(r2.T_PE_GE_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas gentrificables");
        console.log('entre educ')
        datagrafico1.push(r1.T_PE_ES_B);
        datagrafico2.push(r2.T_PE_ES_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Educación Superior");

        console.log('entre viv')
        datagrafico1.push(r1.P_POBR_B.toFixed(2));
        datagrafico2.push(r2.P_POBR_B.toFixed(2));
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Cambio Vivienda");


    }


    console.log('datagrafico1');
    console.log(datagrafico1);

}
function crearGraficoDonaAnios(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre GRAFICO ANISO")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico3');
    var resultado = (resultados1.T_PE_25_B - resultados.T_PE_25_B) /resultados.T_PE_25_B* 100;
    var color;
    if (resultado >= 0) {
        color = "#1af304";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_25_B - resultados.T_PE_25_B) / resultados.T_PE_25_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#a630e8"],
            borderColor: ["#000", "##000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart2) {

        myDoubleBarChart2.destroy();

    }
    myDoubleBarChart2 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                    color: '#000000'
                }
            }
        ,
        animation:false,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
            labels: {
                fontColor: "black",
                fontSize: 25,
                borderColor: "black",
                borderWidth: 6
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Cambio del % Personas 25 > años',
            fontSize: 32,
            fontColor: "#000"
        },
        scaleShowValues: false

    }

});

return canvas;
}


function crearGraficoDonaEmp(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico4');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_EM_B - resultados.T_PE_EM_B) / resultados.T_PE_EM_B*100;
    var color;
    if (resultado >= 0) {
        color = "#1af304";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_EM_B - resultados.T_PE_EM_B) /resultados.T_PE_EM_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#f3b309"],
            borderColor: ["#000", "##000"],
            borderWidth: [1, 1]
        }],

        labels: [
           resultado+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart3) {

        myDoubleBarChart3.destroy();

    }
    myDoubleBarChart3 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas con Empleo',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}
function crearGraficoDonaEmpG(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico5');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_EG_B - resultados.T_PE_EG_B) / resultados.T_PE_EG_B*100;
    var color;
    if (resultado >= 0) {
        color = "#1af304";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_EG_B - resultados.T_PE_EG_B) / resultados.T_PE_EG_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#f3b309"],
            borderColor: ["#000", "##000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart4) {

        myDoubleBarChart4.destroy();

    }
    myDoubleBarChart4 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas con Empleo G-T-ADM',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}
function crearGraficoDonaES(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico6');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_ES_B - resultados.T_PE_ES_B) / resultados.T_PE_ES_B*100;
    var color;
    if (resultado >= 0) {
        color = "#1af304";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_ES_B - resultados.T_PE_ES_B) /resultados.T_PE_ES_B* 100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#f3b309"],
            borderColor: ["#000", "##000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart5) {

        myDoubleBarChart5.destroy();

    }
    myDoubleBarChart5 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas con Educación Superior',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}
function crearGraficoDonaGE(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico7');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_GE_B - resultados.T_PE_GE_B) /resultados.T_PE_GE_B* 100;
    var color;
    if (resultado >= 0) {
        color = "#1af304";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_GE_B - resultados.T_PE_GE_B) / resultados.T_PE_GE_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#f3b309"],
            borderColor: ["#000", "##000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart6) {

        myDoubleBarChart6.destroy();

    }
    myDoubleBarChart6 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas Gentrificables',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}

function crearGraficoDonaCV(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico8');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.P_POBR_B - resultados.P_POBR_B) /resultados.P_POBR_B* 100;
    var color;
    if (resultado >= 0) {
        color = "#1af304";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.P_POBR_B - resultados.P_POBR_B) / resultados.P_POBR_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#f3b309"],
            borderColor: ["#000", "##000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (myDoubleBarChart7) {

        myDoubleBarChart7.destroy();

    }
    myDoubleBarChart7 = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '% de Cambio de Vivienda',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}

function capLetters_1 ( value ) {
    let line = value.toLowerCase().split(' ');
    for ( let i = 0; i < line.length; i += 1 ) {
        line[i] = line[i].slice( 0, 1 ).toUpperCase() + line[i].slice( 1 );
    }
    return line.join(' ');
}
