document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id;
    remove(id).then(() => {
      target.closest('li').remove();
    });
  } else if (target.dataset.type === 'edit') {
    const id = target.dataset.id;
    const newTitle = prompt('Введите новое название');
    newTitle && edit(id, newTitle).then(() => {
      target.parentNode.previousElementSibling.textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(id, newTitle) {
  await fetch(`/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({id, title: newTitle}),
  });
}
