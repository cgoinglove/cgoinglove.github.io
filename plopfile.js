const fs = require('fs');
const { join } = require('path');

const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // 공백을 대시로 바꿈
    .replace(/[^\w\-]+/g, '') // 특수문자 제거
    .replace(/\-\-+/g, '-') // 여러 개의 대시를 하나로 바꿈
    .replace(/^-+/, '') // 선행하는 대시 제거
    .replace(/-+$/, ''); // 후행하는 대시 제거
};
('');
/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
function generator(plop) {
  plop.setHelper('slugify', slugify);

  plop.setGenerator('mdx-post', {
    description: 'Generate a new MDX post and a corresponding image',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Post title:',
      },
      {
        type: 'input',
        name: 'date',
        message: 'Post date (YYYY-MM-DD):',
        default: getFormattedDate(),
        validate: (value) => {
          if (isValidDate(value)) {
            return true;
          } else {
            return 'Invalid date format. Please use YYYY-MM-DD format.';
          }
        },
      },
    ],
    actions: (data) => {
      const slug = slugify(data.title);
      const dirPath = join(process.cwd(), 'public', 'images', slug);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      console.log(`++ ${dirPath}`);
      return [
        {
          type: 'add',
          path: join(process.cwd(), 'src/posts', '{{slugify title}}.mdx'),
          templateFile: 'templates/post.hbs',
        },
      ];
    },
  });
}
module.exports = generator;
