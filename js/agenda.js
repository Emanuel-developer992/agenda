window.onload = function() {
    participantes();
};

$(document).on('change', "#orc",
    function setor() {

        var orc = $('#orc').val()[0];
        var tb_name = "tabelaOrcamento";

        //Filtro de Busca 
        var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
        var docConstraint = DatasetFactory.createConstraint("tb1_orc", orc, orc, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array

        // Busca no Dataset + Condições de Filtro
        var array = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);

        var nArray = array.values.length;

        for (var i = 0; i < nArray; i++) {
            $('#setor').append($('<option>', {
                
                value: array.values[i].tb_estudo,
                text: array.values[i].tb_estudo
            }));
        }
    }
);

$(document).on('change', "#setor",
    function setor() {

        var orc = $('#orc').val()[0];
        var setor = $('#setor').val();
        var tb_name = "tb_sub_R";

        //Filtro de Busca 
        var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
        var c1 = DatasetFactory.createConstraint("tb2_orc", orc, orc, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        var c2 = DatasetFactory.createConstraint("tb_responsavel_h", setor, setor, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        var arrayConstraint = new Array(tbConstraint, c1, c2); // Tranformas as duas constraint em Array

        // Busca no Dataset + Condições de Filtro
        var array = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);

        var nArray = array.values.length;

        for (var i = 0; i < nArray; i++) {
            $('#estudo').append($('<option>', {
                
                value: array.values[i].tb_descricao_h,
                text: array.values[i].tb_descricao_h
            }));
        }
    }
);


function participantes() {

    var dataset = DatasetFactory.getDataset("cadastro_de_participantes", null, null, null);
    var nData = dataset.values.length;

    for (var i = 0; i < nData; i++) {

        $('#participante').append($('<option>', {
                
            value: dataset.values[i].descForm,
            text: dataset.values[i].descForm
        }));
    }

}

$("#save").click(function(){
    descFormId();
    setTimeout(function(){
        $("#workflowActions > button:first-child", window.parent.document).click();
    }, 200); 
});

function descFormId() {
		
    var orc = $('#orc').val()[0];
    var setor = $('#setor').val();
    var partic = $('#participante').val();
    var data = $('#data_ag').val();
    var horas = $('#hrs').val();

    data = data.substring(8, 10)+'/'+data.substring(5, 7)+'/'+data.substring(0, 4);

    var dataset = DatasetFactory.getDataset("processAttachment", null, null, null);
    var nRow = dataset.values.length;

    var nProcess = dataset.values[nRow-1]['processAttachmentPK.processInstanceId'];

    $('#descForm').val(nProcess+1+' : '+partic+' - '+data+' - '+horas+' - '+orc+' - '+setor);
    
};
