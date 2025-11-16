document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formVoluntario");

  // Máscara TELEFONE
  form.telefone.addEventListener("input", () => {
    let v = form.telefone.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10)
      v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (v.length > 6)
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (v.length > 2)
      v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    form.telefone.value = v;
  });

  // Máscara CPF
  form.cpf.addEventListener("input", () => {
    let v = form.cpf.value.replace(/\D/g, "").slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    form.cpf.value = v;
  });

  // Máscara CEP
  form.cep.addEventListener("input", () => {
    let v = form.cep.value.replace(/\D/g, "").slice(0, 8);
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    form.cep.value = v;
  });

  // Validação e envio
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Verifica campos obrigatórios manualmente
    const camposObrigatorios = form.querySelectorAll("input[required], textarea[required]");
    for (const campo of camposObrigatorios) {
      if (!campo.value.trim()) {
        alert("Preencha todos os campos obrigatórios.");
        campo.focus();
        return;
      }
    }

    // Validação de telefone com JS (10-11 dígitos)
    const telefone = form.telefone.value.replace(/\D/g, "");
    if (telefone.length < 10 || telefone.length > 11) {
      alert("Telefone inválido. Use o formato (XX) XXXXX-XXXX.");
      form.telefone.focus();
      return;
    }

    // Tudo OK → mostra mensagem
    const nome = form.nome.value.trim().split(" ")[0] || "voluntário";
    const email = form.email.value.trim();

    form.innerHTML = `
      <div id="mensagemSucesso" style="
        text-align:center;
        padding:30px;
        background:#d4edda;
        color:#155724;
        border:1px solid #c3e6cb;
        border-radius:10px;">
        <h2>✅ Cadastro realizado com sucesso!</h2>
        <p>Obrigado por se juntar à nossa causa, <strong>${nome}</strong> 💙</p>
        <p>Seu apoio é essencial para proteger nossos oceanos!</p>
      </div>
    `;

    setTimeout(() => {
      form.innerHTML = `
        <div id="mensagemFinal" style="
          text-align:center;
          padding:30px;
          background:#e0f7fa;
          color:#006064;
          border:1px solid #b2ebf2;
          border-radius:10px;">
          <h2>🌊 Cadastro Finalizado!</h2>
          <p>Muito obrigado por se cadastrar como voluntário da <strong>ONG Resgate Marinho</strong>!</p>
          <p>Em breve entraremos em contato pelo e-mail <strong>${email}</strong>.</p>
          <p>💙 Juntos fazemos a diferença pelos oceanos!</p>
          <a href="index.html" style="
            display:inline-block;
            margin-top:20px;
            background:#00BFFF;
            color:white;
            padding:10px 20px;
            border-radius:6px;
            text-decoration:none;">Voltar ao Início</a>
        </div>
      `;
    }, 3000);
  });
});
