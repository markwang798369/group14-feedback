(function (root) {
  'use strict';

  const answers = {
    deliverables: "As a team, submit three things: (1) a working prototype demo link accessible throughout the review window, (2) a test log of about 300 words describing cases you ran, failures, fixes, and any deferred fixes with reasons, and (3) 3–5 starter queries or scenarios for reviewers. Submit them in FeedbackFruits.",
    deadline: "The supplied brief says the team submission and each student's peer feedback are due Sunday, 8 November at 23:59. Check the live course page for any update.",
    grade: "The brief says this milestone is worth 15% of the course grade and is the second of four Team Chatbot Competition milestones, which together total 40%. The FeedbackFruits interface shown to the team also displayed 10%; I cannot resolve that discrepancy from the supplied material. Ask in the Course Questions forum.",
    individual: "There is one prototype and test log per team. Each member must individually give feedback on two other teams' prototypes in FeedbackFruits.",
    two: "The FeedbackFruits screen says 'At least 2 submissions required,' while the task text specifies three required items and one team submission. The brief does not explain how the platform counts submissions. Follow the available upload fields, and ask in the Course Questions forum if the requirement remains unclear.",
    testing: "Use a human reviewer to compare a specific answer with a specific source or expected outcome. Record the input, expected result, actual result, what broke, what you fixed or deferred, and why. Asking your own chatbot whether its answer 'seems right' does not count as validation.",
    samples: "Provide 3–5 concrete questions or actions that your prototype was designed to handle. They should give reviewers a useful starting point, while still leaving room for them to probe failures independently.",
    link: "A working demo link is a URL where a reviewer can actually use your prototype throughout the review window. Before submitting it, open it in a private browsing window or another account to check access.",
    late: "The supplied brief says the late-submission policy is 'TBC.' I cannot give a definite late penalty from that source. Check the live course page or ask in the Course Questions forum.",
    questions: "The brief directs questions about the task to the Course Questions forum, rather than private email.",
    unknown: "I can answer questions about the Prototype Feedback assignment brief, including deliverables, the deadline, peer reviews, and testing. I do not have a source for that question. Please check the live course page or ask in the Course Questions forum."
  };

  function respond(raw) {
    const q = String(raw || '').toLowerCase().replace(/[’‘]/g, "'").trim();
    if (!q) return "Please enter a question about the assignment brief.";
    if (/(at least 2|two submissions|2 submissions|two files|2 files|上传两个|交两个)/.test(q)) return answers.two;
    if (/(late|extension|penalty|迟交|逾期)/.test(q)) return answers.late;
    if (/(own answers|own output|self.grade|self.check|human|validate|test log|testing|test cases|测试|验证)/.test(q)) return answers.testing;
    if (/(submit|submission|deliverable|hand in|交什么|提交)/.test(q) && /(deadline|due|when|date|截止|什么时候)/.test(q)) return answers.deliverables + "\n\n" + answers.deadline;
    if (/(grade|points|15%|10%|mark|score|成绩|分数)/.test(q)) return answers.grade;
    if (/(deadline|due|when|date|november|nov\b|截止|什么时候)/.test(q)) return answers.deadline;
    if (/(each member|individual|every member|peer|other teams|review|组员|个人|互评)/.test(q)) return answers.individual;
    if (/(sample|scenario|starter|example quer|示例|问题)/.test(q)) return answers.samples;
    if (/(demo link|prototype link|working link|url|website|链接|网址)/.test(q)) return answers.link;
    if (/(submit|submission|deliverable|hand in|need to do|need to provide|交什么|提交|材料)/.test(q)) return answers.deliverables;
    if (/(forum|email|who to ask|contact|答疑|问老师)/.test(q)) return answers.questions;
    return answers.unknown;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { respond, answers };
  if (!root.document) return;

  const messages = root.document.getElementById('messages');
  const form = root.document.getElementById('ask-form');
  const input = root.document.getElementById('question');
  const reset = root.document.getElementById('reset');
  function addMessage(message, role) {
    const el = root.document.createElement('div');
    el.className = 'message ' + role;
    el.textContent = message;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }
  function ask(question) {
    const cleaned = question.trim();
    if (!cleaned) return;
    addMessage(cleaned, 'user');
    addMessage(respond(cleaned), 'assistant');
    input.value = '';
    input.focus();
  }
  function welcome() {
    messages.replaceChildren();
    addMessage("Hi! I can help you understand the Prototype Feedback assignment. Ask what to submit, when it is due, or how to test your prototype.", 'assistant');
  }
  form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  reset.addEventListener('click', welcome);
  root.document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => ask(button.dataset.question)));
  welcome();
})(typeof window !== 'undefined' ? window : globalThis);

