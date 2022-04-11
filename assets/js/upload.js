const Api = 'https://dev-gorila.herokuapp.com'

function changeName(status, name) {
    document.getElementById("btn_atualizar").innerHTML = name;
    document.getElementById("btn_atualizar").disabled = !status;
}

async function uploadFile() {
    let file = document.getElementById("fileupload").value;
    const idxDot = file.lastIndexOf(".") + 1;
    const extFile = file.substr(idxDot, file.length).toLowerCase();
    if (extFile == "csv") {
        let formData = new FormData();
        try {
            changeName(false,'Atualizando..')
            formData.append("fileCSV", fileupload.files[0]);
            const response = await fetch(`${Api}/cdi`, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                alert('Enviado com sucesso')
            }
        } catch (error) {
            document.getElementById("erro").innerHTML = "Não foi possível concluir a ação. Tente novamente";
        } finally {
            changeName(true, "Atualizar")
        }
    } else {
        alert("Apenas arquivos *.csv");
    }

}
