const usuarios = [];

document.getElementById('tipoMedia').addEventListener('change', atualizarVisibilidadePeso);

function adicionarLinha() {
  const div = document.createElement('div');
  div.innerHTML = `
    <label>Nota: <input type="number" step="0.01" max="10" class="nota-p1"></label>
    <label class="label-peso">Peso: <input type="number" step="0.01" class="peso-p1" value="1"></label>
    <button type="button" onclick="removerLinha(this)">Remover</button>
  `;
  document.getElementById('notas-p1').appendChild(div);
  atualizarVisibilidadePeso();
}

function adicionarLinhaP2() {
  const div = document.createElement('div');
  div.innerHTML = `
    <label>Nota: <input type="number" step="0.01" max="10" class="nota-p2"></label>
    <label class="label-peso">Peso: <input type="number" step="0.01" class="peso-p2" value="1"></label>
    <button type="button" onclick="removerLinha(this)">Remover</button>
  `;
  document.getElementById('notas-p2').appendChild(div);
  atualizarVisibilidadePeso();
}

function removerLinha(btn) {
  btn.parentNode.remove();
}

function atualizarVisibilidadePeso() {
  const mostrarPeso = document.getElementById('tipoMedia').value === 'ponderada';
  document.querySelectorAll('.label-peso').forEach(label => {
    label.style.display = mostrarPeso ? '' : 'none';
    if (!mostrarPeso) {
      const input = label.querySelector('input');
      if (input) input.value = 1;
    }
  });
}

// Chama ao carregar a página para garantir o estado inicial correto
window.onload = atualizarVisibilidadePeso;

function atualizarListaUsuarios() {
  const ul = document.getElementById('listaUsuarios');
  ul.innerHTML = '';
  // Agrupa por nome
  const agrupado = {};
  usuarios.forEach(u => {
    if (!agrupado[u.nome]) agrupado[u.nome] = [];
    agrupado[u.nome].push(u);
  });
  Object.keys(agrupado).forEach(nome => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Aluno:</strong> ${nome}<ul style="margin:8px 0 0 16px; padding:0;">${
      agrupado[nome].map(u =>
        `<li style="margin-bottom:6px;">
          <strong>Matéria:</strong> ${u.materia} <br>
          <strong>Média final:</strong> ${u.mediaFinal} <br>
          <strong>Resultado:</strong> ${u.resultado}
        </li>`
      ).join('')
    }</ul>`;
    ul.appendChild(li);
  });
}

function calcular() {
  const nomeUsuario = document.getElementById('nomeUsuario').value.trim();
  const materia = document.getElementById('materia').value.trim();
  const tipoMedia = document.getElementById('tipoMedia').value;
  if (!nomeUsuario) {
    document.getElementById('resultado').innerText = "Por favor, preencha o nome do estudante.";
    return;
  }
  if (!materia) {
    document.getElementById('resultado').innerText = "Por favor, preencha o nome da matéria.";
    return;
  }

  // P1
  const notasP1 = document.querySelectorAll('.nota-p1');
  const pesosP1 = document.querySelectorAll('.peso-p1');
  // P2
  const notasP2 = document.querySelectorAll('.nota-p2');
  const pesosP2 = document.querySelectorAll('.peso-p2');

  const mediaDesejada = parseFloat(document.getElementById('media').value) || 6;
  let resultado = "";

  if (tipoMedia === "ponderada") {
    // P1
    let somaNotasPesosP1 = 0;
    let somaPesosP1 = 0;
    for (let i = 0; i < notasP1.length; i++) {
      const nota = parseFloat(notasP1[i].value) || 0;
      const peso = parseFloat(pesosP1[i].value) || 1;
      if (nota > 10) {
        document.getElementById('resultado').innerText = "Nenhuma nota pode ser maior que 10.";
        return;
      }
      if (nota < 0) {
        document.getElementById('resultado').innerText = "Nenhuma nota pode ser negativa.";
        return;
      }
      somaNotasPesosP1 += nota * peso;
      somaPesosP1 += peso;
    }
    // P2
    let notasEmBranco = [];
    let somaNotasPesosP2 = 0;
    let somaPesosP2 = 0;
    for (let i = 0; i < notasP2.length; i++) {
      const notaStr = notasP2[i].value;
      const peso = parseFloat(pesosP2[i].value) || 1;
      if (notaStr === "") {
        notasEmBranco.push({peso, index: i});
      } else {
        const nota = parseFloat(notaStr) || 0;
        if (nota > 10) {
          document.getElementById('resultado').innerText = "Nenhuma nota pode ser maior que 10.";
          return;
        }
        if (nota < 0) {
          document.getElementById('resultado').innerText = "Nenhuma nota pode ser negativa.";
          return;
        }
        somaNotasPesosP2 += nota * peso;
        somaPesosP2 += peso;
      }
    }
    const mediaP1 = somaNotasPesosP1 / somaPesosP1;

    if (notasEmBranco.length === 1) {
      const pesoNotaVazia = notasEmBranco[0].peso;
      const mediaP2Necessaria = 2 * mediaDesejada - mediaP1;
      const notaNecessaria = ((mediaP2Necessaria * (somaPesosP2 + pesoNotaVazia)) - somaNotasPesosP2) / pesoNotaVazia;
      if (notaNecessaria > 10) {
        resultado = `Não é possível atingir a média desejada. Você precisaria tirar ${notaNecessaria.toFixed(2)} na nota em branco da P2, mas o máximo é 10.`;
      } else if (notaNecessaria < 0) {
        resultado = `Você já atingiu a média desejada, não precisa de pontos na nota em branco da P2.`;
      } else {
        resultado = `Você precisa tirar <b>${notaNecessaria.toFixed(2)}</b> na nota em branco da P2 para atingir a média desejada.`;
      }
      document.getElementById('resultado').innerHTML = resultado;
    } else if (notasEmBranco.length > 1) {
      // Todas as notas em branco: calcula quanto precisa tirar em cada uma (considerando todas iguais)
      const somaPesosEmBranco = notasEmBranco.reduce((acc, n) => acc + n.peso, 0);
      const mediaP2Necessaria = 2 * mediaDesejada - mediaP1;
      const x = (mediaP2Necessaria * (somaPesosP2 + somaPesosEmBranco) - somaNotasPesosP2) / somaPesosEmBranco;
      if (x > 10) {
        resultado = `Não é possível atingir a média desejada. Você precisaria tirar ${x.toFixed(2)} em cada nota em branco da P2, mas o máximo é 10.`;
      } else if (x < 0) {
        resultado = `Você já atingiu a média desejada, não precisa de pontos nas notas em branco da P2.`;
      } else {
        resultado = `Você precisa tirar <b>${x.toFixed(2)}</b> em cada nota em branco da P2 para atingir a média desejada.`;
      }
      document.getElementById('resultado').innerHTML = resultado;
    } else {
      // Todas preenchidas: calcula a média final normalmente
      const mediaP2 = somaNotasPesosP2 / somaPesosP2;
      const mediaFinal = (mediaP1 + mediaP2) / 2;
      if (mediaFinal >= mediaDesejada) {
        resultado = `Parabéns! Sua média final é ${mediaFinal.toFixed(2)} e você já atingiu a média desejada.`;
      } else {
        resultado = `Sua média final é ${mediaFinal.toFixed(2)}. Não atingiu a média desejada.`;
      }
      document.getElementById('resultado').innerHTML = resultado;
    }
    usuarios.push({
      nome: nomeUsuario,
      materia: materia,
      mediaFinal: somaPesosP1 && somaPesosP2 ? ((somaNotasPesosP1 / somaPesosP1 + somaNotasPesosP2 / somaPesosP2) / 2).toFixed(2) : "-",
      resultado: resultado.replace(/<[^>]*>?/gm, '')
    });
    atualizarListaUsuarios();
    return;
  }

  // MÉDIA SIMPLES
  let somaP1 = 0;
  for (let i = 0; i < notasP1.length; i++) {
    const nota = parseFloat(notasP1[i].value) || 0;
    if (nota > 10) {
      document.getElementById('resultado').innerText = "Nenhuma nota pode ser maior que 10.";
      return;
    }
    if (nota < 0) {
      document.getElementById('resultado').innerText = "Nenhuma nota pode ser negativa.";
      return;
    }
    somaP1 += nota;
  }
  let somaP2 = 0;
  let indexNotaVazia = -1;
  for (let i = 0; i < notasP2.length; i++) {
    const notaStr = notasP2[i].value;
    if (notaStr === "" && indexNotaVazia === -1) {
      indexNotaVazia = i;
    } else {
      const nota = parseFloat(notaStr) || 0;
      if (nota > 10) {
        document.getElementById('resultado').innerText = "Nenhuma nota pode ser maior que 10.";
        return;
      }
      if (nota < 0) {
        document.getElementById('resultado').innerText = "Nenhuma nota pode ser negativa.";
        return;
      }
      somaP2 += nota;
    }
  }
  if (indexNotaVazia !== -1) {
    // (somaP1 + somaP2 + x) / 2 = mediaDesejada
    // x = 2 * mediaDesejada - somaP1 - somaP2
    let notaNecessaria = 2 * mediaDesejada - somaP1 - somaP2;
    if (notaNecessaria > 10) {
      resultado = `Não é possível atingir a média desejada. Você precisaria tirar ${notaNecessaria.toFixed(2)} na nota em branco da P2, mas o máximo é 10.`;
    } else if (notaNecessaria < 0) {
      resultado = `Você já atingiu a média desejada, não precisa de pontos na nota em branco da P2.`;
    } else {
      resultado = `Você precisa tirar <b>${notaNecessaria.toFixed(2)}</b> na nota em branco da P2 para atingir a média desejada.`;
    }
    document.getElementById('resultado').innerHTML = resultado;
  } else {
    // Calcula a média final normalmente
    const mediaFinal = (somaP1 + somaP2) / 2;
    if (mediaFinal >= mediaDesejada) {
      resultado = `Parabéns! Sua média final é ${mediaFinal.toFixed(2)} e você já atingiu a média desejada.`;
    } else {
      resultado = `Sua média final é ${mediaFinal.toFixed(2)}. Não atingiu a média desejada.`;
    }
    document.getElementById('resultado').innerHTML = resultado;
  }
  usuarios.push({
    nome: nomeUsuario,
    materia: materia,
    mediaFinal: ((somaP1 + somaP2) / 2).toFixed(2),
    resultado: resultado.replace(/<[^>]*>?/gm, '')
  });
  atualizarListaUsuarios();
}

function toggleHistorico() {
  const ul = document.getElementById('listaUsuarios');
  if (ul.style.display === "none" || ul.style.display === "") {
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
  }
}

function exportarHistoricoPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  const agrupado = {};
  usuarios.forEach(u => {
    if (!agrupado[u.nome]) agrupado[u.nome] = [];
    agrupado[u.nome].push(u);
  });
  Object.keys(agrupado).forEach(nome => {
    doc.text(`Aluno: ${nome}`, 10, y);
    y += 8;
    agrupado[nome].forEach(u => {
      doc.text(`Matéria: ${u.materia}`, 14, y);
      y += 6;
      doc.text(`Média final: ${u.mediaFinal}`, 14, y);
      y += 6;
      doc.text(`Resultado: ${u.resultado}`, 14, y);
      y += 10;
      if (y > 270) { doc.addPage(); y = 10; }
    });
    y += 4;
  });
  doc.save('historico.pdf');
}