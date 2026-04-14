export function dailyHighlightTemplate(
  posts: { titulo: string; likes: number }[],
) {
  return `
      <div style="font-family: Arial, sans-serif; color: #222;">
        <h2>Destaques do dia</h2>
  
        <ul>
          ${posts
            .map(
              (p) =>
                `<li><strong>${p.titulo}</strong> - ${p.likes} curtidas</li>`,
            )
            .join('')}
        </ul>
      </div>
    `
}
