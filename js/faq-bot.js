/* ============================================================
   iMpact Inc — FAQ assistant
   A small, rule-based chat widget. Answers common questions by
   keyword matching; anything out of scope is handed to WhatsApp.
   Edit the FAQS list below to add or change answers.
   ============================================================ */
(function () {
  var WHATSAPP = "255764765365";
  var WHATSAPP_LABEL = "+255 764 765 365";

  /* Each FAQ: q = chip label, keys = words/phrases that trigger it, a = answer (HTML allowed) */
  var FAQS = [
    {
      q: "What does iMpact Inc do?",
      keys: ["what do you do", "what does", "about", "who are you", "company", "impact inc", "mission", "vision"],
      a: "We're a people-first development partner based in Dar es Salaam. We equip people, leaders and organisations with the tools, insight and confidence to thrive — through people development, leadership growth, workplace transformation and business process outsourcing (BPO). <a href=\"about.html\">Read more about us</a>."
    },
    {
      q: "What services do you offer?",
      keys: ["service", "offer", "provide", "programme", "program", "training", "solutions"],
      a: "Our core services are:<ul><li>People Development</li><li>Leadership Growth</li><li>Workplace Transformation</li><li>Executive Coaching</li><li>Team Effectiveness</li><li>Change Enablement</li><li>Wellbeing at Work</li><li>Capability Building</li></ul>We also offer <a href=\"bpo.html\">Business Process Outsourcing</a>."
    },
    {
      q: "Tell me about BPO",
      keys: ["bpo", "outsourc", "payroll", "recruit", "back office", "back-office", "data entry", "hr ", "human resource", "seo", "marketing", "social media", "content", "branding", "design", "video"],
      a: "Our BPO team handles four areas:<ul><li><strong>HR Outsourcing</strong> — payroll, recruitment, compliance, HR policy, performance management</li><li><strong>Back Office Operations</strong> — data entry, document processing, financial admin, reporting</li><li><strong>Content &amp; Creative</strong> — copywriting, social media, branding, design, video</li><li><strong>Digital Marketing &amp; SEO</strong> — SEO, paid ads, email marketing, analytics</li></ul><a href=\"bpo.html\">See the full BPO page</a>."
    },
    {
      q: "Do you offer leadership coaching?",
      keys: ["coach", "leader", "executive", "manager", "mentor"],
      a: "Yes. We offer one-to-one executive coaching and leadership programmes that turn capable managers into confident, people-first leaders. Our approach is <strong>Discover → Develop → Embed</strong>, so the growth carries on after our work together ends."
    },
    {
      q: "How do you work?",
      keys: ["process", "how do you work", "approach", "method", "steps", "how does it work"],
      a: "For organisations we follow <strong>Diagnose → Design → Deliver</strong>: we map where you are, co-design a practical programme with your people, then roll it out, measure and adjust. For BPO we follow a five-step plan, from first consultation and needs assessment through to implementation and ongoing improvement."
    },
    {
      q: "How much does it cost?",
      keys: ["cost", "price", "pricing", "fee", "charge", "budget", "quote", "rate", "how much"],
      a: "Every engagement is tailored, so pricing depends on your goals, team size and scope. Tell us what you need and we'll send a proposal. The quickest way is <a href=\"index.html#contact\">our contact form</a> or WhatsApp."
    },
    {
      q: "Where are you located?",
      keys: ["where", "location", "located", "office", "address", "visit", "dar es salaam", "tanzania"],
      a: "Our office is at <strong>Mikocheni A, Plot 347, Senga Rd, Dar es Salaam, Tanzania</strong>. We work with clients across Tanzania and beyond."
    },
    {
      q: "Do you work outside Tanzania?",
      keys: ["outside", "international", "abroad", "remote", "online", "virtual", "kenya", "uganda", "africa", "country"],
      a: "Yes. We're based in Dar es Salaam but work with organisations wherever they are, in person or online."
    },
    {
      q: "How can I contact you?",
      keys: ["contact", "email", "phone", "call", "reach", "talk", "speak", "number"],
      a: "You can reach us by:<ul><li>Email: <a href=\"mailto:info@impactinc.co.tz\">info@impactinc.co.tz</a></li><li>Phone / WhatsApp: <a href=\"tel:+" + WHATSAPP + "\">" + WHATSAPP_LABEL + "</a></li><li>The <a href=\"index.html#contact\">contact form</a></li></ul>We usually reply within one working day."
    },
    {
      q: "How quickly do you respond?",
      keys: ["respond", "response", "reply", "how long", "how soon", "quick", "fast", "hours", "open"],
      a: "We read every message and usually reply <strong>within one working day</strong>. For anything urgent, WhatsApp us on " + WHATSAPP_LABEL + "."
    },
    {
      q: "Who have you worked with?",
      keys: ["client", "worked with", "experience", "portfolio", "track record", "reference", "who uses"],
      a: "We've developed 12,000+ people, coached 340+ leaders and served 75+ organisations across sectors, including Azam, Nokia, Yara and Young Life. 96% of participants rate our programmes highly."
    },
    {
      q: "Are you hiring?",
      keys: ["job", "career", "hiring", "vacanc", "work for you", "join", "intern", "employment", "cv"],
      a: "We don't have open roles listed on the website right now. Send your CV to <a href=\"mailto:info@impactinc.co.tz\">info@impactinc.co.tz</a> and we'll keep you in mind."
    },
    {
      q: "How is my data used?",
      keys: ["privacy", "data", "personal information", "gdpr", "cookies"],
      a: "We only use your details to reply to you. See our <a href=\"privacy.html\">privacy notice</a> for the full details."
    }
  ];

  var GREETINGS = ["hi", "hello", "hey", "habari", "mambo", "good morning", "good afternoon", "good evening", "salaam"];
  var THANKS = ["thank", "thanks", "asante", "cheers"];

  function waLink(text) {
    return "https://wa.me/" + WHATSAPP + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  function normalise(s) {
    return " " + s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim() + " ";
  }

  function hasAny(text, words) {
    return words.some(function (w) { return text.indexOf(w) !== -1; });
  }

  /* Score each FAQ by matched keywords; longer phrases count more. */
  function findAnswer(input) {
    var text = normalise(input);
    var best = null, bestScore = 0;
    FAQS.forEach(function (f) {
      var score = 0;
      f.keys.forEach(function (k) { if (text.indexOf(k) !== -1) score += k.split(" ").length; });
      if (score > bestScore) { bestScore = score; best = f; }
    });
    return best;
  }

  /* ---------- build the widget ---------- */
  var root = document.createElement("div");
  root.className = "faqbot";
  root.innerHTML =
    '<button type="button" class="faqbot__launcher" aria-expanded="false" aria-controls="faqbotPanel" aria-label="Open chat with iMpact Inc">' +
      '<svg class="faqbot__ic-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>' +
      '<svg class="faqbot__ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    '</button>' +
    '<section class="faqbot__panel" id="faqbotPanel" role="dialog" aria-label="iMpact Inc help" hidden>' +
      '<header class="faqbot__head">' +
        '<span class="faqbot__avatar" aria-hidden="true"><svg viewBox="0 0 120 120"><g fill="currentColor"><circle cx="26" cy="27" r="17.5"/><rect x="15.5" y="53" width="21" height="53" rx="10.5"/><rect x="80" y="13" width="22" height="93" rx="11"/><path d="M27 62 C 43 92, 65 84, 91 54" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round"/></g></svg></span>' +
        '<div class="faqbot__title"><strong>iMpact Assistant</strong><span>Answers to common questions</span></div>' +
        '<a class="faqbot__wa-top" href="' + waLink("Hello iMpact Inc, I have a question.") + '" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>' +
        '</a>' +
      '</header>' +
      '<div class="faqbot__log" role="log" aria-live="polite"></div>' +
      '<div class="faqbot__chips" aria-label="Suggested questions"></div>' +
      '<form class="faqbot__form" autocomplete="off">' +
        '<label class="sr-only" for="faqbotInput">Type your question</label>' +
        '<input id="faqbotInput" type="text" placeholder="Type your question…" maxlength="300" />' +
        '<button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
      '</form>' +
    '</section>';
  document.body.appendChild(root);

  var launcher = root.querySelector(".faqbot__launcher");
  var panel = root.querySelector(".faqbot__panel");
  var log = root.querySelector(".faqbot__log");
  var chips = root.querySelector(".faqbot__chips");
  var form = root.querySelector(".faqbot__form");
  var input = root.querySelector("#faqbotInput");
  var started = false;

  function addMsg(html, who) {
    var m = document.createElement("div");
    m.className = "faqbot__msg faqbot__msg--" + who;
    if (who === "user") m.textContent = html; else m.innerHTML = html;
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
  }

  function botReply(html) {
    var typing = document.createElement("div");
    typing.className = "faqbot__msg faqbot__msg--bot faqbot__typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;
    setTimeout(function () { typing.remove(); addMsg(html, "bot"); }, 550);
  }

  function waButton(question) {
    var text = question ? "Hello iMpact Inc, I have a question: " + question : "Hello iMpact Inc, I have a question.";
    return '<a class="faqbot__wa-btn" href="' + waLink(text) + '" target="_blank" rel="noopener">Chat on WhatsApp · ' + WHATSAPP_LABEL + '</a>';
  }

  function renderChips() {
    chips.innerHTML = "";
    FAQS.slice(0, 6).forEach(function (f) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "faqbot__chip";
      b.textContent = f.q;
      b.addEventListener("click", function () { ask(f.q, f); });
      chips.appendChild(b);
    });
  }

  function ask(question, faq) {
    addMsg(question, "user");
    var text = normalise(question);
    var match = faq || findAnswer(question);

    if (!match && hasAny(text, THANKS.map(function (w) { return " " + w; }))) {
      botReply("You're welcome! Anything else I can help with?");
      return;
    }
    if (!match && hasAny(text, GREETINGS.map(function (w) { return " " + w + " "; }))) {
      botReply("Hello! 👋 Ask me about our services, BPO, pricing, location or how to get in touch.");
      return;
    }
    if (match) {
      botReply(match.a);
      return;
    }
    botReply("I'm not sure I can answer that one here. Our team can help you directly on WhatsApp:" + waButton(question));
  }

  function setOpen(open) {
    panel.hidden = !open;
    root.classList.toggle("is-open", open);
    launcher.setAttribute("aria-expanded", open ? "true" : "false");
    launcher.setAttribute("aria-label", open ? "Close chat" : "Open chat with iMpact Inc");
    if (open && !started) {
      started = true;
      addMsg("Hi! 👋 I'm the iMpact Assistant. Pick a question below or type your own. For anything I can't answer, you can reach our team on WhatsApp at <strong>" + WHATSAPP_LABEL + "</strong>.", "bot");
      renderChips();
    }
    if (open) input.focus();
  }

  launcher.addEventListener("click", function () { setOpen(panel.hidden); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) { setOpen(false); launcher.focus(); }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    input.value = "";
    ask(q);
  });
})();
