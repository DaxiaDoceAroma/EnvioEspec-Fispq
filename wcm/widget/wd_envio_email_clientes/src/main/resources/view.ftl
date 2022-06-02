<#assign coreContext='wd_envio_email_clientes'> <#assign mode='view'> <#assign vueEnv='vue'>

<div id="wd_EnvioEmail_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="wd_EnvioEmail.instance()">
  <div id="app">
    <div class="row">
      <!-- Carregar de dataset -->
      <div class="col-md-2 col-xs-12">
        <div class="form-group">
          <label class="control-label" for="tipoDocumentacao">
            Tipo de Documentação
            <span class="required text-danger" data-toggle="tooltip" data-placement="top" title="Obrigatório"><strong>*</strong></span>
          </label>
          <select class="form-control" name="tipoDocumentacao" id="tipoDocumentacao" v-model="tipoDocumentacao">
            <option value="">Selecione</option>
            <option v-for="(tipoDocumentacao, indice) in tiposDocumentacao" :value="tipoDocumentacao.codigo">{{ tipoDocumentacao.descricao }}</option>
          </select>
        </div>
      </div>

      <div class="col-md-6 col-xs-12">
        <div class="form-group">
          <label class="control-label" for="cliente">
            Cliente
            <span class="required text-danger" data-toggle="tooltip" data-placement="top" title="Obrigatório"><strong>*</strong></span>
          </label>
          <div class="input-group">
            <span class="input-group-addon">
              <span>Entrar com e-mails</span>&nbsp;
              <input type="checkbox" v-model="entrarComEmail" />
            </span>
            <input type="text" name="cliente" id="cliente" class="form-control" :readonly="!entrarComEmail" v-model="cliente" />
            <span class="input-group-btn" v-if="!entrarComEmail">
              <button class="btn btn-default" @click.prevent="clearField('cliente')">
                <span class="fluigicon fluigicon-trash"></span>
              </button>
              <button class="btn btn-default" @click.prevent="openZoom('cliente')">
                <span class="fluigicon fluigicon-zoom-in"></span>
              </button>
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-xs-12 fs-lg-margin-top">
        <div class="form-group">
          <label class="control-label fs-md-margin-right" for="nao_copia">
            Tipo de Cópia
            <i
              class="fluigicon fluigicon-info-sign icon-xs"
              data-toggle="tooltip"
              data-placement="top"
              title="Como deseja receber uma cópia desse e-mail no seu e-mail cadastrado no Fluig"
            ></i>
          </label>

          <div class="custom-radio custom-radio-inline custom-radio-warning">
            <input type="radio" name="copia" value="nao_copiar" id="nao_copia" checked v-model="tipoCopia" />
            <label for="nao_copia">Não me copiar</label>
          </div>

          <div class="custom-radio custom-radio-inline custom-radio-success">
            <input type="radio" name="copia" value="cc" id="cc" v-model="tipoCopia" />
            <label for="cc">CC</label>
          </div>

          <div class="custom-radio custom-radio-inline custom-radio-primary">
            <input type="radio" name="copia" value="cco" id="cco" v-model="tipoCopia" />
            <label for="cco">CCO</label>
          </div>
        </div>
      </div>
    </div>

    <div class="row fs-sm-margin-top">
      <div class="col-md-2 col-xs-12">
        <button class="btn btn-info btn-block" :disabled="tipoDocumentacao === ''" @click.prevent="openZoom('anexos')">
          <i class="fluigicon fluigicon-fileadd"></i>&nbsp;
          <span class="fs-font-bold">Adicionar anexo</span>
        </button>
      </div>

      <div class="col-md-3 col-md-12 pull-right fs-sm-margin-right" v-show="anexos.length !== 0">
        <span class="help-block pull-right">Tamanho dos arquivos: {{ anexosSize }} MB</span>
      </div>
    </div>

    <div class="fs-md-margin-top">
      <div class="well">
        <div class="text-center fs-font-bold" v-show="anexos.length === 0">Nenhum anexo selecionado</div>

        <div class="col-md-1 col-xs-12" v-for="(anexo, indice) in anexos" :key="'anexo_' + indice">
          <div class="attachment">
            <button type="button" class="close" aria-label="Close" @click.prevent="removeAttachment(anexo)">
              <span aria-hidden="true">&times;</span>
            </button>
            <img
              src="/style-guide/images/illustrations/builder.svg"
              data-toggle="tooltip"
              data-placement="top"
              :title="anexo['documentPK.documentId']  + ' - ' + anexo.documentDescription"
            />
            <small class="help-block">{{ anexo['documentPK.documentId'] + ' - ' + anexo.documentDescription }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-xs-12">
        <button class="btn btn-success btn-lg btn-block" @click.prevent="submitEmail">
          <i class="flaticon flaticon-send"></i>&nbsp;
          <span class="fs-font-bold">Enviar E-mail</span>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Libs -->
<script src="/${coreContext}/resources/js/lib/${vueEnv}.js"></script>
<script src="/${coreContext}/resources/js/lib/zoomModal.js"></script>
<script src="/webdesk/vcXMLRPC.js"></script>

<!-- Utils -->
<script src="/${coreContext}/resources/js/utils/ui.js"></script>
<script src="/${coreContext}/resources/js/utils/utils.js"></script>

<!-- Services -->
<script src="/${coreContext}/resources/js/service/userService.js"></script>
<script src="/${coreContext}/resources/js/service/documentationService.js"></script>
<script src="/${coreContext}/resources/js/service/emailService.js"></script>

<!-- Vue Instance -->
<script src="/${coreContext}/resources/js/instances/${mode}.js"></script>

<!-- Main -->
<script src="/${coreContext}/resources/js/${coreContext}.js"></script>
