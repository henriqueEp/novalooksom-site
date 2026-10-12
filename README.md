# Site Nova Look Som — novalooksom.com.br

Site institucional de uma página (HTML + CSS + JS puro, sem dependências e sem build).

## Abrir no VS Code

1. `Arquivo > Abrir Pasta...` e escolha a pasta `novalooksom-site`.
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` > **Open with Live Server**.
   (Ou dê dois cliques no `index.html` para abrir direto no navegador.)

## Estrutura

```
index.html                 página inteira (textos, seções, contatos)
assets/css/style.css       visual (cores no topo, em :root)
assets/js/main.js          menu do celular + formulário que abre o WhatsApp
assets/img/favicon.svg     ícone da aba
assets/img/clientes/       logos dos clientes já padronizados (400x160, fundo transparente)
CNAME                      domínio para o GitHub Pages
robots.txt / sitemap.xml   para o Google
```

## Onde editar os dados

| O quê | Onde |
|---|---|
| WhatsApp | `index.html` (procure `5511977194026`) **e** `assets/js/main.js` (variável `WHATSAPP`) |
| E-mail | `index.html` (procure `atendimento@novalooksom.com.br`) |
| Endereço | `index.html` (seção `#contato` e o bloco JSON-LD no `<head>`) |
| Cores | `assets/css/style.css`, bloco `:root` |
| Logos de clientes | adicione o PNG em `assets/img/clientes/` e uma linha `<img>` na seção Clientes |

O formulário **não salva nada**: ele só monta a mensagem e abre o WhatsApp da fábrica. Não precisa de servidor nem de banco de dados.

## Publicar (GitHub Pages + domínio da GoDaddy)

### 1. GitHub
1. Crie um repositório público, por exemplo `novalooksom-site`, e suba estes arquivos.
2. `Settings > Pages > Source: Deploy from a branch > main / (root)`.
3. Em **Custom domain** coloque `www.novalooksom.com.br` (o arquivo `CNAME` já tem isso).

### 2. GoDaddy (DNS)
Antes de tudo, veja em `Meu Domínio > DNS` se os **nameservers são da GoDaddy**. Se forem do Microsoft 365 ou do Google, os registros abaixo são criados lá, não na GoDaddy.

Adicione/edite **somente** estes registros:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `SEU-USUARIO.github.io` |

Se já existir um registro A `@` apontando para "Parked"/estacionamento da GoDaddy, apague só esse.

> ⚠️ **Não mexa** nos registros **MX**, **TXT** (SPF/DKIM/DMARC) nem em CNAMEs de e-mail (`autodiscover`, `email`, etc.). São eles que mantêm o e-mail `atendimento@` funcionando.

### 3. Finalizar
- A propagação leva de minutos até 24 h.
- Depois volte em `Settings > Pages` e marque **Enforce HTTPS**.
- Teste `novalooksom.com.br` e `www.novalooksom.com.br`.

### 4. Google
- Crie/reivindique o **Perfil da Empresa no Google** (Google Business Profile) com o mesmo endereço e telefone do site.
- Cadastre o site no **Google Search Console** e envie `https://www.novalooksom.com.br/sitemap.xml`.

## Confirmar antes de publicar

- [ ] Os clientes autorizam o uso dos logos no site?
- [ ] Drivers: marca própria ou revenda? (se revenda, ter autorização da marca)
- [ ] Prazo médio de produção e pedido mínimo
- [ ] Horário de atendimento, CNPJ e redes sociais (Instagram/LinkedIn)
- [ ] Fotos dos produtos (bobinas e drivers em fundo neutro), quando houver
