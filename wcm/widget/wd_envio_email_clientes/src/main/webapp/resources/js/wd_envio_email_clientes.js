var wd_EnvioEmail = SuperWidget.extend({
  init() {
    setTitle('Envio de documentação');

    const widget = this;
    widget.app = vueInstance(widget);
    widget.app.mount('#app');

    widget.app.config.errorHandler = err => {
      console.error(err);
      FLUIGC.toast({
        title: 'Erro não tratado: ',
        message: 'Contate o administrador do sistema',
        type: 'danger'
      });
    };
  }
});
