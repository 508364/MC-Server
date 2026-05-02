// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else {
    // 默认使用浅色主题
    body.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
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

// 确保模态框导航按钮为空，使用CSS伪元素显示图标
if (modalPrevBtn) {
    modalPrevBtn.textContent = '';
}
if (modalNextBtn) {
    modalNextBtn.textContent = '';
}

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

// QQ群相关功能
let qqModal;
let qqGroupBtn;
let qqJoinBtn;
let qqCloseBtn;
let qqGroupInfo;
let qqGroupData = null;

// 榜单相关功能
let rankingList;

// 分类导航相关功能
let categoryItems;
let categoryContents;

// 画廊相关功能
let galleryGrid;

// 初始化DOM元素
function initDomElements() {
    console.log('初始化DOM元素');
    cookieModal = document.getElementById('cookie-modal');
    cookieAcceptBtn = document.getElementById('cookie-accept');
    cookieRejectBtn = document.getElementById('cookie-reject');
    
    // 初始化QQ群模态框元素
    qqModal = document.getElementById('qq-modal');
    qqGroupBtn = document.getElementById('qq-group-btn');
    qqJoinBtn = document.getElementById('qq-join');
    qqCloseBtn = document.getElementById('qq-close');
    qqGroupInfo = document.getElementById('qq-group-info');
    
    // 初始化榜单元素
    rankingList = document.getElementById('ranking-list');
    
    // 初始化分类导航元素
    categoryItems = document.querySelectorAll('.category-item');
    categoryContents = document.querySelectorAll('.category-content');
    
    // 初始化画廊元素
    galleryGrid = document.getElementById('gallery-grid');
    
    console.log('DOM元素初始化结果:', {
        cookieModal: !!cookieModal,
        cookieAcceptBtn: !!cookieAcceptBtn,
        cookieRejectBtn: !!cookieRejectBtn,
        qqModal: !!qqModal,
        qqGroupBtn: !!qqGroupBtn,
        qqJoinBtn: !!qqJoinBtn,
        qqCloseBtn: !!qqCloseBtn,
        qqGroupInfo: !!qqGroupInfo,
        rankingList: !!rankingList,
        categoryItems: !!categoryItems,
        categoryContents: !!categoryContents,
        galleryGrid: !!galleryGrid
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

// 触发图片下载并显示为背景
function triggerImageDownload() {
    // GitHub API 地址，用于获取 Photo 目录下的文件列表
    const githubApiUrl = 'https://api.github.com/repos/508364/-/contents/Photo';
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
                            console.log('相册使用缓存的图片信息');
                            // 直接从缓存加载图片
                            displayImagesAsBackground(cachedData.images);
                        } else {
                            console.log('相册图片有更新，更新缓存');
                            storeImageCache(imageUrls);
                            // 启动多线程下载图片
                            downloadImages(imageUrls);
                            // 显示图片为背景
                            displayImagesAsBackground(imageUrls);
                        }
                    } else {
                        // 首次缓存
                        console.log('相册首次缓存图片信息');
                        storeImageCache(imageUrls);
                        // 启动多线程下载图片
                        downloadImages(imageUrls);
                        // 显示图片为背景
                        displayImagesAsBackground(imageUrls);
                    }
                } else {
                    // 没有cookie同意，不使用缓存，直接显示
                    console.log('未同意cookie，直接加载相册图片');
                    displayImagesAsBackground(imageUrls);
                }
            }
        })
        .catch(error => {
            console.error('获取图片列表失败:', error);
        });
}

// 显示图片为背景
function displayImagesAsBackground(imageUrls) {
    console.log('显示图片为背景:', imageUrls.length, '张图片');
    if (!galleryGrid) {
        console.error('galleryGrid元素未找到');
        return;
    }
    
    // 清空画廊
    galleryGrid.innerHTML = '';
    
    // 添加图片作为背景
    imageUrls.forEach((image, index) => {
        console.log('添加图片作为背景:', image.url);
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.backgroundImage = `url(${image.url})`;
        galleryGrid.appendChild(galleryItem);
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
    
    // 分类导航事件
    if (categoryItems) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.dataset.category;
                console.log('用户点击了分类:', category);
                showCategory(category);
            });
        });
        console.log('添加分类导航事件监听器');
    }
}

// 显示指定分类
function showCategory(category) {
    console.log('显示分类:', category);
    
    // 更新分类项状态
    if (categoryItems) {
        categoryItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.category === category) {
                item.classList.add('active');
            }
        });
    }
    
    // 更新内容显示
    if (categoryContents) {
        categoryContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === category + '-content') {
                content.classList.add('active');
            }
        });
    }
    
    // 如果是排行榜分类，自动加载内容
    if (category === 'ranking') {
        console.log('切换到排行榜分类，自动加载内容');
        loadRankingContent();
    }
    
    // 如果是相册分类，自动加载图片
    if (category === 'gallery') {
        console.log('切换到相册分类，自动加载图片');
        triggerImageDownload();
    }
    
    // 自动滚动对齐到顶部
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.scrollTop = 0;
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

// 打开QQ群模态框
function openQQModal() {
    console.log('打开QQ群模态框');
    if (qqModal) {
        qqModal.style.display = 'flex';
        // 如果还没有获取群信息，先获取
        if (!qqGroupData) {
            fetchQQGroupInfo();
        } else {
            // 显示已获取的群信息
            displayQQGroupInfo(qqGroupData);
        }
    }
}

// 关闭QQ群模态框
function closeQQModal() {
    console.log('关闭QQ群模态框');
    if (qqModal) {
        qqModal.style.display = 'none';
    }
}

// 加入QQ群
function joinQQGroup() {
    console.log('用户点击了加入QQ群按钮');
    // 打开QQ群链接
    window.open('https://qm.qq.com/cgi-bin/qm/qr?k=hbCnVdRs3YiMEGtPXG49AG-v4DAHSenI&jump_from=webapi&authKey=M/ehxPVTzAoXjSSQcTkVQaOHKaLKutOJ/nOOj2eCtc8NZkNPr3g5BoAUe1upR1Av', '_blank');
}

// 显示QQ群信息
function displayQQGroupInfo(groupData) {
    console.log('显示QQ群信息:', groupData);
    if (qqGroupInfo) {
        if (groupData) {
            // 获取群号
            const groupCode = groupData.code || '949639146';
            // 使用正确的群聊头像URL格式
            const avatarUrl = `https://p.qlogo.cn/gh/${groupCode}/${groupCode}/`;
            
            // 构建QQ群信息HTML
            const qqInfoHTML = `
                <div class="qq-info-grid">
                    <div class="qq-group-avatar">
                        <img src="${avatarUrl}" alt="QQ群头像" onerror="this.onerror=null;this.src='https://via.placeholder.com/120';">
                    </div>
                    <div class="qq-group-details">
                        <div class="qq-group-item">
                            <i class="fas fa-users"></i>
                            <span class="label">群名称:</span>
                            <span class="value">${groupData.name || '服务器交流群'}</span>
                        </div>
                        <div class="qq-group-item">
                            <i class="fas fa-hashtag"></i>
                            <span class="label">群号:</span>
                            <span class="value">${groupCode}</span>
                        </div>
                        <div class="qq-group-item">
                            <i class="fas fa-user-friends"></i>
                            <span class="label">群成员:</span>
                            <span class="value">${groupData.memberCount || '未知'}人</span>
                        </div>
                        <div class="qq-group-item">
                            <i class="fas fa-info-circle"></i>
                            <span class="label">群简介:</span>
                            <span class="value">${groupData.desc || '暂无简介'}</span>
                        </div>
                        ${groupData.tags && groupData.tags.length > 0 ? `
                        <div class="qq-group-item">
                            <i class="fas fa-tags"></i>
                            <span class="label">群标签:</span>
                            <span class="value">${groupData.tags.join(', ')}</span>
                        </div>
                        ` : ''}
                        ${groupData.createtime ? `
                        <div class="qq-group-item">
                            <i class="fas fa-calendar"></i>
                            <span class="label">创建时间:</span>
                            <span class="value">${new Date(groupData.createtime * 1000).toLocaleString('zh-CN')}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            qqGroupInfo.innerHTML = qqInfoHTML;
        } else {
            // 显示默认群信息（隐藏数据）
            const defaultGroupCode = '949639146';
            const defaultAvatarUrl = `https://p.qlogo.cn/gh/${defaultGroupCode}/${defaultGroupCode}/`;
            
            const defaultInfoHTML = `
                <div class="qq-info-grid">
                    <div class="qq-group-avatar">
                        <img src="${defaultAvatarUrl}" alt="QQ群头像" onerror="this.onerror=null;this.src='https://via.placeholder.com/120';">
                    </div>
                    <div class="qq-group-details">
                        <div class="qq-group-item">
                            <i class="fas fa-users"></i>
                            <span class="label">群名称:</span>
                            <span class="value">解析失败</span>
                        </div>
                        <div class="qq-group-item">
                            <i class="fas fa-hashtag"></i>
                            <span class="label">群号:</span>
                            <span class="value">${defaultGroupCode}</span>
                        </div>
                        <div class="qq-group-item">
                            <i class="fas fa-user-friends"></i>
                            <span class="label">群成员:</span>
                            <span class="value">0人</span>
                        </div>
                        <div class="qq-group-item">
                            <i class="fas fa-info-circle"></i>
                            <span class="label">群简介:</span>
                            <span class="value">暂无简介</span>
                        </div>
                    </div>
                </div>
            `;
            qqGroupInfo.innerHTML = defaultInfoHTML;
        }
    }
}

// 获取并显示QQ群信息（使用外部代理）
function fetchQQGroupInfo() {
    console.log('获取QQ群信息（使用外部代理）');
    // 使用codetabs作为代理获取QQ群页面
    const proxyUrl = 'https://api.codetabs.com/v1/proxy/?quest=https://qm.qq.com/q/OCroL7bkq';
    
    // 显示加载状态
    if (qqGroupInfo) {
        qqGroupInfo.innerHTML = '<div class="loading">正在获取群信息...</div>';
    }
    
    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应失败: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            console.log('获取到HTML数据，开始解析');
            
            // 尝试提取script标签中的JSON数据
            const scriptMatch = html.match(/<script type="application\/json"[^>]*id="__NUXT_DATA__">([\s\S]*?)<\/script>/);
            
            if (scriptMatch) {
                console.log('找到__NUXT_DATA__脚本标签');
                
                try {
                    const jsonData = JSON.parse(scriptMatch[1]);
                    console.log('解析__NUXT_DATA__成功');
                    
                    // 查找包含groupinfo的元素
                    let groupInfoData = null;
                    
                    for (let i = 0; i < jsonData.length; i++) {
                        const item = jsonData[i];
                        
                        if (typeof item === 'string') {
                            try {
                                const parsedItem = JSON.parse(item);
                                if (parsedItem.groupinfo) {
                                    groupInfoData = parsedItem;
                                    break;
                                }
                            } catch (e) {
                                // 忽略解析失败的字符串
                            }
                        } else if (typeof item === 'object' && item !== null && item.groupinfo) {
                            groupInfoData = item;
                            break;
                        }
                    }
                    
                    if (groupInfoData && groupInfoData.groupinfo) {
                        console.log('找到groupinfo数据');
                        
                        const groupinfo = groupInfoData.groupinfo;
                        const groupcode = groupinfo.groupcode || groupinfo.code || '949639146';
                        
                        qqGroupData = {
                            avatar: `https://p.qlogo.cn/gh/${groupcode}/${groupcode}/`,
                            name: groupinfo.name || '服务器交流群',
                            code: groupcode,
                            memberCount: groupinfo.memberCnt || '未知',
                            desc: groupinfo.description || '欢迎加入我们的服务器交流群！',
                            tags: groupinfo.tags || [],
                            createtime: groupinfo.createtime || null,
                            memberAvatars: groupinfo.memberAvatars || []
                        };
                        
                        displayQQGroupInfo(qqGroupData);
                    } else {
                        console.error('未找到群信息数据');
                        displayQQGroupInfo(null);
                    }
                } catch (error) {
                    console.error('解析__NUXT_DATA__失败:', error);
                    displayQQGroupInfo(null);
                }
            } else {
                console.error('未找到__NUXT_DATA__脚本标签');
                displayQQGroupInfo(null);
            }
        })
        .catch(error => {
            console.error('获取QQ群信息失败:', error);
            // 显示错误信息并使用默认数据
            if (qqGroupInfo) {
                qqGroupInfo.innerHTML = '<div class="loading">获取群信息失败，显示默认信息</div>';
                setTimeout(() => {
                    displayQQGroupInfo(null);
                }, 1000);
            }
        });
}

// 获取QQ群信息
function getQQGroupInfo() {
    if (qqGroupBtn) {
        console.log('初始化QQ群按钮事件');
        
        // 添加点击事件，打开模态框
        qqGroupBtn.addEventListener('click', function() {
            console.log('用户点击了QQ群按钮');
            openQQModal();
        });
        
        // 初始化模态框按钮事件
        if (qqJoinBtn) {
            qqJoinBtn.addEventListener('click', joinQQGroup);
        }
        
        if (qqCloseBtn) {
            qqCloseBtn.addEventListener('click', closeQQModal);
        }
        
        // 移除了关闭按钮span，只保留底部的关闭按钮
        
        // 点击模态框外部关闭
        qqModal.addEventListener('click', function(event) {
            if (event.target === qqModal) {
                closeQQModal();
            }
        });
        
        // 预获取QQ群信息
        fetchQQGroupInfo();
    }
}

// 加载榜单内容
function loadRankingContent() {
    console.log('加载榜单内容');
    const targetElement = document.getElementById('ranking-content');
    console.log('目标元素:', targetElement);
    if (targetElement) {
        targetElement.innerHTML = '<div class="loading">正在加载榜单...</div>';
        
        const timestamp = new Date().getTime();
        const githubUrl = `https://gh-proxy.com/https://raw.githubusercontent.com/508364/-/main/ranking.md?_=${timestamp}`;
        console.log('请求URL:', githubUrl);
        console.log('marked库可用:', typeof marked !== 'undefined');
        
        fetch(githubUrl)
            .then(response => {
                console.log('响应状态:', response.status);
                if (!response.ok) {
                    throw new Error('网络响应失败: ' + response.status);
                }
                return response.text();
            })
            .then(markdown => {
                console.log('获取到的markdown内容（前100字符）:', markdown.substring(0, 100));
                console.log('marked库可用:', typeof marked !== 'undefined');
                
                if (typeof marked !== 'undefined' && marked.parse) {
                    const html = marked.parse(markdown);
                    console.log('渲染后的HTML:', html);
                    targetElement.innerHTML = '<h2>排行榜</h2>' + html;
                    console.log('内容已设置到元素中');
                } else {
                    throw new Error('marked库未正确加载');
                }
            })
            .catch(error => {
                console.error('加载榜单失败:', error);
                targetElement.innerHTML = '<div class="error">加载榜单失败，请稍后再试: ' + error.message + '</div>';
            });
    } else {
        console.error('找不到ranking-content元素');
    }
}

// 初始化榜单功能
function initRanking() {
    console.log('初始化榜单功能');
}

// 获取链接列表
function fetchServerLinks() {
    console.log('开始获取服务器链接列表');
    const nodeJsonUrl = 'https://gh-proxy.com/https://raw.githubusercontent.com/508364/-/refs/heads/main/node.json';
    console.log('请求URL:', nodeJsonUrl);
    
    fetch(nodeJsonUrl)
        .then(response => {
            console.log('响应状态:', response.status);
            console.log('响应状态文本:', response.statusText);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('获取到服务器链接数据:', data);
            
            // 直接处理数据，不检查data.state，因为JSON结构中没有state字段
            processServerLinks(data);
        })
        .catch(error => {
            console.error('获取服务器链接失败:', error);
        });
}

// 处理服务器链接数据
function processServerLinks(data) {
    console.log('处理服务器链接数据:', data);
    
    // 检查数据结构
    if (data && typeof data === 'object') {
        // 转换JSON结构为数组格式
        const nodes = Object.entries(data).map(([name, node]) => ({
            name: name,
            state: node.state === 'true' || node.state === true, // 处理字符串和布尔值
            address: node.url || node.address // 处理url或address字段
        }));
        
        console.log('所有节点:', nodes);
        console.log('节点数量:', nodes.length);
        
        // 过滤出状态为true的节点
        const activeNodes = nodes.filter(node => node.state === true);
        console.log('活跃节点:', activeNodes);
        console.log('活跃节点数量:', activeNodes.length);
        
        // 更新页面上的服务器地址列表
        updateServerAddresses(activeNodes);
    }
}

// 更新服务器地址列表
function updateServerAddresses(nodes) {
    const addressGrid = document.querySelector('.address-grid');
    if (!addressGrid) return;
    
    // 清空现有地址
    addressGrid.innerHTML = '';
    
    // 添加新地址
    nodes.forEach((node, index) => {
        const addressCard = document.createElement('div');
        addressCard.className = 'address-card';
        
        const nodeName = node.name || `节点${index + 1}`;
        const address = node.address || '';
        
        addressCard.innerHTML = `
            <h3>${nodeName}</h3>
            <div class="address">
                <span class="address-text">${address}</span>
                <button class="copy-btn" onclick="copyAddress('${address}')">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `;
        
        addressGrid.appendChild(addressCard);
    });
}

// 获取整合包下载链接
function fetchModpackLinks() {
    console.log('开始获取整合包下载链接');
    const modsJsonUrl = 'https://raw.githubusercontent.com/508364/-/main/mods.json';
    console.log('请求URL:', modsJsonUrl);
    
    fetch(modsJsonUrl)
        .then(response => {
            console.log('响应状态:', response.status);
            console.log('响应状态文本:', response.statusText);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.text();
        })
        .then(text => {
            // 修复JSON格式（添加缺失的逗号）
            const fixedText = text.replace(/"([^"\n]+)"\s*:\s*"([^"\n]+)"\s*\n/g, '"$1": "$2",\n');
            console.log('修复后的JSON:', fixedText);
            
            try {
                const data = JSON.parse(fixedText);
                console.log('获取到整合包下载链接数据:', data);
                updateModpackLinks(data);
            } catch (error) {
                console.error('解析JSON失败:', error);
                // 手动解析作为后备方案
                parseModpackDataManually(text);
            }
        })
        .catch(error => {
            console.error('获取整合包下载链接失败:', error);
        });
}

// 手动解析整合包数据
function parseModpackDataManually(text) {
    console.log('尝试手动解析整合包数据');
    
    const urlMatch = text.match(/"url"\s*:\s*"([^"]+)"/);
    const proxyUrlMatch = text.match(/"proxy-url"\s*:\s*"([^"]+)"/);
    
    const data = {};
    if (urlMatch) {
        data.url = urlMatch[1];
    }
    if (proxyUrlMatch) {
        data['proxy-url'] = proxyUrlMatch[1];
    }
    
    console.log('手动解析结果:', data);
    updateModpackLinks(data);
}

// 更新整合包下载链接
function updateModpackLinks(data) {
    const downloadSection = document.querySelector('.download-section');
    if (!downloadSection) return;
    
    // 清空现有链接
    const existingLinks = downloadSection.querySelectorAll('.download-btn');
    existingLinks.forEach(link => link.remove());
    
    // 添加新链接
    if (data.url) {
        const directLink = document.createElement('a');
        directLink.href = data.url;
        directLink.className = 'download-btn';
        directLink.target = '_blank';
        directLink.innerHTML = '<i class="fas fa-download"></i> <strong>github</strong>直接下载';
        downloadSection.appendChild(directLink);
    }
    
    if (data['proxy-url']) {
        const proxyLink = document.createElement('a');
        proxyLink.href = data['proxy-url'];
        proxyLink.className = 'download-btn';
        proxyLink.target = '_blank';
        proxyLink.innerHTML = '<i class="fas fa-bolt"></i> <strong>gh-proxy</strong>加速下载';
        downloadSection.appendChild(proxyLink);
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
    // 初始化榜单功能
    initRanking();
    // 获取服务器链接列表
    console.log('调用fetchServerLinks');
    fetchServerLinks();
    // 获取整合包下载链接
    console.log('调用fetchModpackLinks');
    fetchModpackLinks();
    // 显示默认分类
    showCategory('info');
    console.log('初始化完成');
});

// 修改initGallery函数以支持图片缓存
function initGallery() {
    // 获取main-content section
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    // GitHub API 地址，用于获取 Photo 目录下的文件列表
    const githubApiUrl = 'https://api.github.com/repos/508364/-/contents/Photo';
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

                // 设置初始背景图片
                updateBackgroundImage();

                // 启动轮播
                setInterval(() => {
                    // 切换到下一张图片
                    currentIndex = (currentIndex + 1) % imageUrls.length;
                    updateBackgroundImage();
                }, 5000); // 每5秒切换一次
            }
        })
        .catch(error => {
            console.error('获取图片失败:', error);
        });

    // 更新背景图片
    function updateBackgroundImage() {
        mainContent.style.backgroundImage = `url('${imageUrls[currentIndex].url}')`;
    }
}