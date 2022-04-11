const Api = 'https://dev-gorila.herokuapp.com'

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
async function getID() {
    var url_ = new URL(location.href);
    var string = url_.searchParams.get("id");
    getData(string);
}
function changeName(status, name) {
    document.getElementById("btn_buscar").innerHTML = name;
    document.getElementById("btn_buscar").disabled = !status;
}
async function getData(id) {
    if (id === null || id === '') {
        return 
    }
    try {
        changeName(true,'Carregando..')
        const response = await fetch(
            `${Api}/cdb/${id}`);
        const responseJSON = await response.json();
        if (response.status != 200) {
            drawChart([]);
            return document.getElementById("erro").innerHTML = responseJSON.msg;

        }
        drawChart(responseJSON, id);
    } catch (error) {
        return document.getElementById("erro").innerHTML = "Não foi possível concluir a ação. Tente novamente";
    } finally {
        changeName(true, 'Buscar')
    }
}
function buscarCDB() {
    const input = document.getElementById("idcdb").value;
    changeName(false, 'Buscando..')
    window.location.href = `/gorila_teste_frontend/pages/chart.html?id=${input}`;
}
async function drawChart(array, id) {
    if (array.length < 1) {
        return
    }
    const arrayRows = []
    for (let element of array) {
        arrayRows.push([element.date, element.unitPrice],);
    }
    const data = new google.visualization.DataTable()
    data.addColumn('string', 'Data');
    data.addColumn('number', 'Valor R$');
    data.addRows(arrayRows)
    var options = {
        title: `Cálculo da taxa CDI | Número de identificação: ${id}`,
        hAxis: { title: 'Data do investimento' },
        vAxis: { title: 'Preços unitário do CDB' },
        legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('Chart'));
    chart.draw(data, options);
}