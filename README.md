# Restaurante Os Compadres

Protótipo do novo site do Restaurante Os Compadres (Ameixoeira, Lumiar, Lisboa).

É um site estático em HTML, CSS e JavaScript, sem dependências nem passo de compilação.

## Ver o site

Abrir o `index.html` no navegador.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `index.html` | Página em português |
| `en/index.html`, `fr/index.html` | Páginas em inglês e francês, só com ementa e informações práticas |
| `css/styles.css` | Estilos |
| `js/conteudo.js` | Horário, novidades, galeria, grupos, ementa, vinhos e sugestões do sommelier |
| `js/traducao.en.js`, `js/traducao.fr.js` | Traduções; o que não estiver traduzido aparece em português |
| `js/main.js` | Estado aberto/fechado, ementa, carta de vinhos, sommelier, galeria, grupos e menu móvel |
| `assets/` | Imagens e tipos de letra alojados no próprio site |
| `_headers` | Cabeçalhos de segurança para a Cloudflare Pages |

## Editar o conteúdo

O conteúdo que muda com mais frequência está em `js/conteudo.js`. Quando existir, o painel de gestão da gerente passará a fornecer estes dados.

## Antes de publicar

- [ ] Retirar `<meta name="robots" content="noindex">` das três páginas
- [ ] Substituir os vinhos de exemplo pela carta real
- [ ] Substituir a capacidade e os menus de exemplo da secção de grupos
- [ ] Rever as traduções em inglês e francês
- [ ] Ativar o Cloudflare Web Analytics: Workers & Pages > projeto > Metrics > Enable
- [ ] Trocar as fotografias de baixa resolução da galeria
- [ ] Validar as sugestões do sommelier com o restaurante
- [ ] Acrescentar preços e informação sobre alergénios
- [ ] Confirmar horário, ementa e novidades com a gerente
- [ ] Confirmar os direitos de utilização das fotografias
- [ ] Trocar o logótipo por uma versão em vetor
- [ ] Acrescentar a política de privacidade
- [ ] Criar o painel de gestão da gerente

## Direitos

As fotografias, o logótipo e os textos pertencem aos respetivos titulares e não estão abrangidos por uma licença aberta. Os tipos de letra Fraunces e Figtree são distribuídos sob a SIL Open Font License.
