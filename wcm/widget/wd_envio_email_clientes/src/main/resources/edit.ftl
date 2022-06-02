<#assign coreContext='wd_envio_email_clientes'> <#assign mode='edit'> <#assign vueEnv='vue'>

<div id="wd_EnvioEmail_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="wd_EnvioEmail.instance()">
  <div id="app">
    <h2>Envio de Especificação Técnica e FISPQ</h2>
  </div>
</div>

<!-- Libs -->
<script src="/${coreContext}/resources/js/lib/${vueEnv}.js"></script>

<!-- Utils -->
<script src="/${coreContext}/resources/js/utils/ui.js"></script>

<!-- Vue Instance -->
<script src="/${coreContext}/resources/js/instances/${mode}.js"></script>

<!-- Main -->
<script src="/${coreContext}/resources/js/${coreContext}.js"></script>
