// Nova Look Som — interações do site (sem dependências)
(function () {
  'use strict';

  var WHATSAPP = '5511977194026'; // número da Nova Look Som, só dígitos, com 55 + DDD

  // Menu no celular
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var aberto = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(aberto));
      btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Formulário: monta a mensagem e abre o WhatsApp (nenhum dado é salvo no site)
  var form = document.getElementById('orcamento');
  if (form) {
    var err = document.getElementById('f-err');
    form.addEventListener('input', function () { err.hidden = true; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = document.getElementById('f-nome').value.trim();
      var empresa = document.getElementById('f-empresa').value.trim();
      var tipo = document.getElementById('f-tipo').value;
      var interesse = document.getElementById('f-interesse').value;
      var qtd = document.getElementById('f-qtd').value.trim();
      var cnpj = document.getElementById('f-cnpj').value.trim();
      var msg = document.getElementById('f-msg').value.trim();
      if (!nome || !msg) { err.hidden = false; return; }

      // Rótulos da mensagem no idioma da página (data-lang="es" na versão em espanhol)
      var t = form.dataset.lang === 'es'
        ? { oi: 'Hola, vengo del sitio de Nova Look Som (español).', nome: 'Nombre', empresa: 'Empresa', cnpj: 'Identificación fiscal', tipo: 'Soy', interesse: 'Interés', qtd: 'Cantidad', pedido: 'Pedido' }
        : { oi: 'Olá, vim pelo site da Nova Look Som.', nome: 'Nome', empresa: 'Empresa', cnpj: 'CNPJ', tipo: 'Sou', interesse: 'Interesse', qtd: 'Quantidade', pedido: 'Pedido' };

      var texto = t.oi + '\n' +
        t.nome + ': ' + nome + '\n' +
        (empresa ? t.empresa + ': ' + empresa + '\n' : '') +
        (cnpj ? t.cnpj + ': ' + cnpj + '\n' : '') +
        t.tipo + ': ' + tipo + '\n' +
        t.interesse + ': ' + interesse + '\n' +
        (qtd ? t.qtd + ': ' + qtd + '\n' : '') +
        t.pedido + ': ' + msg;
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
