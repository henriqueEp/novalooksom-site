// Nova Look Som · novo visual · interações da home (sem dependências)
(function () {
  'use strict';

  var WHATSAPP = '5511977194026'; // ao trocar, trocar também nos links do index.html e no assets/js/main.js (páginas internas)

  /* Menu do celular */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    var setMenu = function (aberto) {
      // o menu começa onde o topo termina (a faixa de cima pode estar na tela ou não)
      if (aberto) menu.style.top = Math.round(btn.closest('.topo').getBoundingClientRect().bottom) + 'px';
      menu.classList.toggle('is-aberto', aberto);
      btn.setAttribute('aria-expanded', String(aberto));
      btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = aberto ? 'hidden' : '';
    };
    btn.addEventListener('click', function () { setMenu(!menu.classList.contains('is-aberto')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-aberto')) { setMenu(false); btn.focus(); }
    });
  }

  /* Largura da tela sem a barra de rolagem (a foto da capa encosta na borda direita sem passar dela) */
  var raiz = document.documentElement;
  var medir = function () { raiz.style.setProperty('--vw', raiz.clientWidth + 'px'); };
  medir();
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(raiz);
  else window.addEventListener('resize', medir);

  /* Topo ganha uma linha quando a página rola; o menu marca a seção em que o visitante está */
  var topo = document.querySelector('.topo');
  /* Inclui o botão "Pedir orçamento" (#contato): na seção de contato nenhum link de texto fica marcado */
  var linksMenu = Array.prototype.slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  var secoes = linksMenu.map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); });
  var agendado = false;
  var marcar = function () {
    agendado = false;
    if (topo) topo.classList.toggle('is-rolado', window.scrollY > 8);
    var atual = -1, linha = window.innerHeight * 0.35;
    secoes.forEach(function (sec, i) { if (sec && sec.getBoundingClientRect().top < linha) atual = i; });
    linksMenu.forEach(function (l, i) {
      if (i === atual && !l.classList.contains('btn')) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', function () {
    if (!agendado) { agendado = true; window.requestAnimationFrame(marcar); }
  }, { passive: true });
  marcar();

  /* Chamadas técnicas: desenham quando a foto entra na tela */
  var anotadas = document.querySelectorAll('[data-anotada]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visivel'); io.unobserve(e.target); }
      });
    }, { threshold: 0.35 });
    anotadas.forEach(function (el) { io.observe(el); });
  } else {
    anotadas.forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* Placas de reparo: virar para ver a frente e o verso da peça.
     A foto do verso fica escondida (lazy não a carregaria), então é pedida quando a placa se aproxima da tela. */
  var cards = document.querySelectorAll('[data-virar]');
  var carregarVerso = function (card) {
    var img = card.querySelector('.virar__lado--verso img');
    if (img && img.loading === 'lazy') img.loading = 'eager';
  };
  if ('IntersectionObserver' in window) {
    var ioVerso = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { carregarVerso(e.target); ioVerso.unobserve(e.target); }
      });
    }, { rootMargin: '600px 0px' });
    cards.forEach(function (c) { ioVerso.observe(c); });
  } else {
    cards.forEach(carregarVerso);
  }
  cards.forEach(function (card) {
    var b = card.querySelector('.virar__btn');
    var lados = card.querySelectorAll('.virar__lado');
    if (!b) return;
    b.addEventListener('pointerenter', function () { carregarVerso(card); });
    b.addEventListener('click', function () {
      var verso = !card.classList.contains('is-verso');
      card.classList.toggle('is-verso', verso);
      b.setAttribute('aria-pressed', String(verso));
      b.querySelector('span').textContent = verso ? 'Ver frente' : 'Ver verso';
      lados[0].setAttribute('aria-hidden', String(verso));
      lados[1].setAttribute('aria-hidden', String(!verso));
    });
  });

  /* Formulário: o botão é um link real para o wa.me. O script confere os campos e mantém a
     mensagem pronta no link. Nenhum dado é enviado a servidor nem salvo no site (LGPD). */
  var form = document.getElementById('orcamento');
  var enviar = document.getElementById('f-send');
  if (form && enviar) {
    var erro = document.getElementById('f-erro');
    var val = function (id) { return document.getElementById(id).value.trim(); };
    var mensagem = function () {
      var linhas = ['Olá, vim pelo site da Nova Look Som.', 'Nome: ' + val('f-nome')];
      if (val('f-empresa')) linhas.push('Empresa: ' + val('f-empresa'));
      if (val('f-cnpj')) linhas.push('CNPJ: ' + val('f-cnpj'));
      linhas.push('Sou: ' + val('f-tipo'), 'Interesse: ' + val('f-interesse'));
      if (val('f-qtd')) linhas.push('Quantidade: ' + val('f-qtd'));
      linhas.push('Pedido: ' + val('f-msg'));
      return linhas.join('\n');
    };
    var atualizar = function () { enviar.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensagem()); };
    var valido = function () {
      if (val('f-nome') && val('f-msg')) return true;
      erro.hidden = false;
      document.getElementById(val('f-nome') ? 'f-msg' : 'f-nome').focus();
      return false;
    };
    form.addEventListener('input', function () { erro.hidden = true; atualizar(); });
    form.addEventListener('change', atualizar);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    enviar.addEventListener('click', function (e) { if (valido()) atualizar(); else e.preventDefault(); });
    /* Enter num campo de uma linha: confere e segue pelo mesmo link */
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); enviar.click(); }
    });
    atualizar();
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
