const Api = 'https://dev-gorila.herokuapp.com'

function redirect(id) {
    window.location.href = `/pages/chart.html?id=${id}`;
}

function consultar() {
    const datainicial = document.getElementById("datainicio").value;
    const valorCDB = document.getElementById("valor").value;
    const datafinal = document.getElementById("datafinal").value;
    if (datafinal === '' || datainicial === '' || valorCDB === '') {
        return alert('Favor preencher todos os dados')
    }
    novaConsulta({ datainicial, datafinal, valorCDB })
}
function changeName(status, name) {
    document.getElementById("botao").innerHTML = name;
    document.getElementById("botao").disabled = status;
}
async function novaConsulta(params) {
    try {
        changeName(true, "Salvando..")
        const rawResponse = await fetch(`${Api}/cdb`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                investmentDate: params.datainicial,
                cdbRate: params.valorCDB,
                currentDate: params.datafinal
            })
        });
        const content = await rawResponse.json();
        redirect(content.id)
    } catch (error) {
        document.getElementById("erro").innerHTML = "Não foi possível concluir a ação. Tente novamente";
    } finally {
        changeName(false, "Consultar")
    }
}