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

      var texto = 'Olá, vim pelo site da Nova Look Som.\n' +
        'Nome: ' + nome + '\n' +
        (empresa ? 'Empresa: ' + empresa + '\n' : '') +
        (cnpj ? 'CNPJ: ' + cnpj + '\n' : '') +
        'Sou: ' + tipo + '\n' +
        'Interesse: ' + interesse + '\n' +
        (qtd ? 'Quantidade: ' + qtd + '\n' : '') +
        'Pedido: ' + msg;
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
