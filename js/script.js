// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    // 添加过渡效果类
    body.classList.add('theme-transition');
    
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // 过渡结束后移除过渡效果类
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 500);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// 复制地址功能
function copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
        // 显示复制成功提示
        const btn = event.target.closest('.copy-btn');
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            btn.innerHTML = originalIcon;
        }, 1000);
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 图片预览模态框功能
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.querySelector('.caption');
const closeBtn = document.getElementsByClassName('close')[0];

// 打开模态框
function openModal(imgSrc, caption) {
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    captionText.innerHTML = caption;
}

// 关闭模态框
function closeModal() {
    modal.style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
};

// 关闭按钮点击事件
if (closeBtn) {
    closeBtn.onclick = closeModal;
}

// 画廊功能 - 作为背景图片轮播
function initGallery() {
    // 创建背景图片容器
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'hero-background';
    heroSection.appendChild(backgroundContainer);

    // GitHub API 地址，用于获取 Photo 目录下的文件列表
    const githubApiUrl = 'https://api.github.com/repos/508364/MC-Server/contents/Photo';
    const ghProxyUrl = 'https://gh-proxy.com/';
    let imageUrls = [];
    let currentIndex = 0;

    // 发送请求获取文件列表
    fetch(githubApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 过滤出图片文件
            const imageFiles = data.filter(file => {
                const ext = file.name.split('.').pop().toLowerCase();
                return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
            });

            // 生成背景图片
            if (imageFiles.length > 0) {
                // 存储图片链接
                imageUrls = imageFiles.map(file => ({
                    url: ghProxyUrl + file.download_url,
                    name: file.name
                }));

                // 创建初始图片
                updateBackgroundImage();

                // 启动轮播
                setInterval(() => {
                    // 实现右滑切换效果
                    const nextIndex = (currentIndex + 1) % imageUrls.length;
                    
                    // 创建下一张图片（从右侧进入）
                    const nextImg = document.createElement('img');
                    nextImg.src = imageUrls[nextIndex].url;
                    nextImg.alt = `背景图片 ${nextIndex + 1}`;
                    nextImg.className = 'background-image next';
                    
                    // 添加点击事件
                    nextImg.addEventListener('click', function() {
                        openModal(this.src, imageUrls[nextIndex].name);
                    });
                    
                    // 添加到容器
                    backgroundContainer.appendChild(nextImg);
                    
                    // 触发重排，然后开始动画
                    void nextImg.offsetWidth;
                    
                    // 获取当前图片
                    const currentImg = backgroundContainer.querySelector('.background-image.active');
                    if (currentImg) {
                        currentImg.className = 'background-image prev';
                    }
                    
                    // 激活下一张图片
                    nextImg.className = 'background-image active';
                    
                    // 动画结束后移除旧图片
                    setTimeout(() => {
                        const prevImg = backgroundContainer.querySelector('.background-image.prev');
                        if (prevImg) {
                            backgroundContainer.removeChild(prevImg);
                        }
                    }, 1000);
                    
                    // 更新当前索引
                    currentIndex = nextIndex;
                }, 5000); // 每5秒切换一次
            }
        })
        .catch(error => {
            console.error('获取图片失败:', error);
        });

    // 更新背景图片 - 实现右滑切换效果
    function updateBackgroundImage() {
        // 清空容器
        backgroundContainer.innerHTML = '';

        // 创建图片元素
        const img = document.createElement('img');
        img.src = imageUrls[currentIndex].url;
        img.alt = `背景图片 ${currentIndex + 1}`;
        img.className = 'background-image active';

        // 添加点击事件
        img.addEventListener('click', function() {
            openModal(this.src, imageUrls[currentIndex].name);
        });

        backgroundContainer.appendChild(img);
    }
}

// 页面加载完成后初始化画廊
window.addEventListener('DOMContentLoaded', initGallery);