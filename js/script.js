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
const modalPrevBtn = document.querySelector('.modal-prev');
const modalNextBtn = document.querySelector('.modal-next');

// 存储当前图片信息
let currentImageIndex = 0;
let allImageUrls = [];

// 打开模态框
function openModal(imgSrc, caption, index, imageUrls) {
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    // 不显示图片名称
    captionText.innerHTML = '';
    // 存储当前图片索引和所有图片信息
    currentImageIndex = index;
    allImageUrls = imageUrls;
}

// 关闭模态框
function closeModal() {
    modal.style.display = 'none';
}

// 切换到上一张图片
function prevImage() {
    if (allImageUrls.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + allImageUrls.length) % allImageUrls.length;
        const prevImg = allImageUrls[currentImageIndex];
        modalImg.src = prevImg.url;
    }
}

// 切换到下一张图片
function nextImage() {
    if (allImageUrls.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % allImageUrls.length;
        const nextImg = allImageUrls[currentImageIndex];
        modalImg.src = nextImg.url;
    }
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

// 左右切换按钮点击事件
if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', prevImage);
}

if (modalNextBtn) {
    modalNextBtn.addEventListener('click', nextImage);
}

// 检查图片缓存
function checkImageCache() {
    // 这里将在获取图片列表后实现
}

// Cookie相关功能
let cookieModal;
let cookieAcceptBtn;
let cookieRejectBtn;

// 初始化DOM元素
function initDomElements() {
    console.log('初始化DOM元素');
    cookieModal = document.getElementById('cookie-modal');
    cookieAcceptBtn = document.getElementById('cookie-accept');
    cookieRejectBtn = document.getElementById('cookie-reject');
    console.log('DOM元素初始化结果:', {
        cookieModal: !!cookieModal,
        cookieAcceptBtn: !!cookieAcceptBtn,
        cookieRejectBtn: !!cookieRejectBtn
    });
}

// 检查用户是否已经同意使用cookie
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    console.log('检查Cookie同意状态:', consent);
    if (!consent || consent === 'rejected') {
        // 显示cookie同意模态框
        if (cookieModal) {
            console.log('显示Cookie模态框');
            cookieModal.style.display = 'flex';
        } else {
            console.error('cookieModal元素未找到');
        }
    } else {
        // 用户已经同意，检查图片缓存
        console.log('用户已同意使用Cookie:', consent);
        if (consent === 'accepted') {
            checkImageCache();
        }
    }
}

// 同意使用cookie
function acceptCookies() {
    console.log('用户同意使用Cookie');
    localStorage.setItem('cookieConsent', 'accepted');
    console.log('Cookie同意状态已存储:', localStorage.getItem('cookieConsent'));
    if (cookieModal) {
        cookieModal.style.display = 'none';
    }
    // 开始图片缓存和多线程下载
    checkImageCache();
    // 尝试重新获取图片列表并下载
    triggerImageDownload();
}

// 拒绝使用cookie
function rejectCookies() {
    console.log('用户拒绝使用Cookie');
    localStorage.setItem('cookieConsent', 'rejected');
    console.log('Cookie拒绝状态已存储:', localStorage.getItem('cookieConsent'));
    // 清理图片缓存数据
    localStorage.removeItem('imageCache');
    console.log('图片缓存已清理');
    if (cookieModal) {
        cookieModal.style.display = 'none';
    }
}

// 检查图片缓存
function checkImageCache() {
    // 这里将在获取图片列表后实现
}

// 存储图片缓存信息
function storeImageCache(imageInfo) {
    const cacheData = {
        images: imageInfo,
        timestamp: Date.now()
    };
    localStorage.setItem('imageCache', JSON.stringify(cacheData));
}

// 获取存储的图片缓存信息
function getImageCache() {
    const cacheData = localStorage.getItem('imageCache');
    return cacheData ? JSON.parse(cacheData) : null;
}

// 计算图片的SHA值（模拟实现，实际项目中可能需要更复杂的实现）
function calculateImageSHA(imageUrl) {
    // 这里使用简单的哈希方法，实际项目中可能需要使用更安全的哈希算法
    let hash = 0;
    for (let i = 0; i < imageUrl.length; i++) {
        const char = imageUrl.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

// 触发图片下载
function triggerImageDownload() {
    // GitHub API 地址，用于获取 Photo 目录下的文件列表
    const githubApiUrl = 'https://api.github.com/repos/508364/MC-Server/contents/Photo';
    const ghProxyUrl = 'https://gh-proxy.com/';
    
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

            // 生成图片信息
            if (imageFiles.length > 0) {
                // 存储图片链接和SHA值
                const imageUrls = imageFiles.map(file => ({
                    url: ghProxyUrl + file.download_url,
                    name: file.name,
                    sha: file.sha // GitHub API返回的文件SHA值
                }));
                
                // 启动多线程下载图片
                console.log('触发多线程下载图片');
                downloadImages(imageUrls);
            }
        })
        .catch(error => {
            console.error('获取图片列表失败:', error);
        });
}

// 多线程下载图片
function downloadImages(imageUrls) {
    const maxThreads = 4; // 最大线程数
    const queue = [...imageUrls];
    const downloading = new Set();
    
    function startNextDownload() {
        if (queue.length === 0 || downloading.size >= maxThreads) {
            return;
        }
        
        const imageInfo = queue.shift();
        downloading.add(imageInfo.url);
        
        console.log(`开始下载图片: ${imageInfo.name}`);
        
        // 创建图片对象进行预加载
        const img = new Image();
        img.src = imageInfo.url;
        
        img.onload = function() {
            console.log(`图片下载完成: ${imageInfo.name}`);
            downloading.delete(imageInfo.url);
            startNextDownload(); // 开始下一个下载
        };
        
        img.onerror = function() {
            console.error(`图片下载失败: ${imageInfo.name}`);
            downloading.delete(imageInfo.url);
            startNextDownload(); // 开始下一个下载
        };
    }
    
    // 启动初始下载线程
    for (let i = 0; i < maxThreads && queue.length > 0; i++) {
        startNextDownload();
    }
}

// 初始化事件监听器
function initEventListeners() {
    console.log('初始化事件监听器');
    // 事件监听器
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', acceptCookies);
        console.log('添加cookieAcceptBtn事件监听器');
    }

    if (cookieRejectBtn) {
        cookieRejectBtn.addEventListener('click', rejectCookies);
        console.log('添加cookieRejectBtn事件监听器');
    }

    // Cookie设置按钮事件
    const cookieSettingsBtn = document.getElementById('cookie-settings');
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function() {
            // 显示Cookie设置模态框
            console.log('用户点击了Cookie设置按钮');
            showCookieSettingsModal();
        });
        console.log('添加cookieSettingsBtn事件监听器');
    }
}

// 显示Cookie设置模态框
function showCookieSettingsModal() {
    // 创建设置模态框内容
    const currentConsent = localStorage.getItem('cookieConsent');
    const isAccepted = currentConsent === 'accepted';
    
    // 修改当前模态框内容
    const cookieContent = document.querySelector('.cookie-content');
    if (cookieContent) {
        cookieContent.innerHTML = `
            <h2>Cookie设置</h2>
            <p>您当前的Cookie授权状态：<strong>${isAccepted ? '已允许' : '已拒绝'}</strong></p>
            
            <p><strong>Cookie使用对比分析表：</strong></p>
            <table class="cookie-comparison">
                <thead>
                    <tr>
                        <th>功能/权益</th>
                        <th>允许使用Cookie</th>
                        <th>拒绝使用Cookie</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>图片加载速度</td>
                        <td>更快</td>
                        <td>较慢</td>
                    </tr>
                    <tr>
                        <td>页面浏览体验</td>
                        <td>更流畅</td>
                        <td>可能卡顿</td>
                    </tr>
                    <tr>
                        <td>网络流量消耗</td>
                        <td>更少</td>
                        <td>更多</td>
                    </tr>
                    <tr>
                        <td>背景图片预加载</td>
                        <td>支持</td>
                        <td>不支持</td>
                    </tr>
                    <tr>
                        <td>图片更新检测</td>
                        <td>智能检测</td>
                        <td>每次重新检查</td>
                    </tr>
                    <tr>
                        <td>服务器带宽使用</td>
                        <td>更少</td>
                        <td>更多</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="cookie-buttons">
                <button id="cookie-toggle" class="cookie-btn ${isAccepted ? 'reject' : 'accept'}">${isAccepted ? '撤销授权' : '允许授权'}</button>
                <button id="cookie-close" class="cookie-btn reject">关闭</button>
            </div>
        `;
        
        // 显示模态框
        cookieModal.style.display = 'flex';
        
        // 添加新按钮的事件监听器
        setTimeout(() => {
            const cookieToggleBtn = document.getElementById('cookie-toggle');
            const cookieCloseBtn = document.getElementById('cookie-close');
            
            if (cookieToggleBtn) {
                cookieToggleBtn.addEventListener('click', function() {
                    // 直接执行授权操作，不显示二次确认
                    if (isAccepted) {
                        rejectCookies();
                        // 重新显示设置模态框
                        showCookieSettingsModal();
                    } else {
                        acceptCookies();
                        // 重新显示设置模态框
                        showCookieSettingsModal();
                    }
                });
            }
            
            if (cookieCloseBtn) {
                cookieCloseBtn.addEventListener('click', function() {
                    cookieModal.style.display = 'none';
                });
            }
        }, 100);
    }
}

// 获取QQ群信息
function getQQGroupInfo() {
    const qqGroupBtn = document.getElementById('qq-group-btn');
    if (qqGroupBtn) {
        console.log('获取QQ群信息');
        const proxyUrl = 'https://api.codetabs.com/v1/proxy/?quest=https://qm.qq.com/q/OCroL7bkqI';
        
        fetch(proxyUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // 提取script标签中的JSON数据
                const scriptMatch = html.match(/<script type="application\/json"[^>]*id="__NUXT_DATA__">([\s\S]*?)<\/script>/);
                if (scriptMatch) {
                    try {
                        const jsonData = JSON.parse(scriptMatch[1]);
                        console.log('QQ群信息获取成功:', jsonData);
                        // 提取群信息
                        if (jsonData[9] && jsonData[9].groupinfo) {
                            const groupInfo = jsonData[9].groupinfo;
                            console.log('群信息:', groupInfo);
                            // 可以在这里更新群聊按钮的行为
                            qqGroupBtn.addEventListener('click', function() {
                                window.open('https://qm.qq.com/q/OCroL7bkqI', '_blank');
                            });
                        }
                    } catch (error) {
                        console.error('解析QQ群信息失败:', error);
                        // 解析失败时，使用默认链接
                        qqGroupBtn.addEventListener('click', function() {
                            window.open('https://qm.qq.com/q/OCroL7bkqI', '_blank');
                        });
                    }
                } else {
                    console.error('未找到QQ群信息');
                    // 未找到信息时，使用默认链接
                    qqGroupBtn.addEventListener('click', function() {
                        window.open('https://qm.qq.com/q/OCroL7bkqI', '_blank');
                    });
                }
            })
            .catch(error => {
                console.error('获取QQ群信息失败:', error);
                // 请求失败时，使用默认链接
                qqGroupBtn.addEventListener('click', function() {
                    window.open('https://qm.qq.com/q/OCroL7bkqI', '_blank');
                });
            });
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化');
    // 初始化DOM元素
    initDomElements();
    // 初始化事件监听器
    initEventListeners();
    // 检查cookie同意
    checkCookieConsent();
    // 初始化画廊
    initGallery();
    // 获取QQ群信息
    getQQGroupInfo();
    console.log('初始化完成');
});

// 修改initGallery函数以支持图片缓存
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
                // 存储图片链接和SHA值
                imageUrls = imageFiles.map(file => ({
                    url: ghProxyUrl + file.download_url,
                    name: file.name,
                    sha: file.sha // GitHub API返回的文件SHA值
                }));

                // 检查cookie同意状态
                const consent = localStorage.getItem('cookieConsent');
                if (consent === 'accepted') {
                    // 检查图片缓存
                    const cachedData = getImageCache();
                    if (cachedData) {
                        // 检查缓存是否需要更新
                        const needsUpdate = imageUrls.some(img => {
                            const cachedImg = cachedData.images.find(cacheImg => cacheImg.name === img.name);
                            return !cachedImg || cachedImg.sha !== img.sha;
                        });

                        if (!needsUpdate) {
                            console.log('使用缓存的图片信息');
                        } else {
                            console.log('图片有更新，更新缓存');
                            storeImageCache(imageUrls);
                            // 启动多线程下载图片
                            downloadImages(imageUrls);
                        }
                    } else {
                        // 首次缓存
                        console.log('首次缓存图片信息');
                        storeImageCache(imageUrls);
                        // 启动多线程下载图片
                        downloadImages(imageUrls);
                    }
                }

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
                        openModal(this.src, imageUrls[nextIndex].name, nextIndex, imageUrls);
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
                    
                    // 动画结束后移除旧图片（等待动画完全结束）
                    setTimeout(() => {
                        const prevImg = backgroundContainer.querySelector('.background-image.prev');
                        if (prevImg) {
                            console.log('移除旧图片');
                            backgroundContainer.removeChild(prevImg);
                        }
                    }, 1100); // 稍微延迟，确保动画完全结束
                    
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
            openModal(this.src, imageUrls[currentIndex].name, currentIndex, imageUrls);
        });

        backgroundContainer.appendChild(img);
    }
}