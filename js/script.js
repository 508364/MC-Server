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
let rankingModal;
let rankingBtn;
let rankingCloseBtn;
let rankingRefreshBtn;
let rankingContent;

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
    
    // 初始化榜单模态框元素
    rankingModal = document.getElementById('ranking-modal');
    rankingBtn = document.getElementById('ranking-btn');
    rankingCloseBtn = document.getElementById('ranking-close');
    rankingRefreshBtn = document.getElementById('ranking-refresh');
    rankingContent = document.getElementById('ranking-content');
    
    console.log('DOM元素初始化结果:', {
        cookieModal: !!cookieModal,
        cookieAcceptBtn: !!cookieAcceptBtn,
        cookieRejectBtn: !!cookieRejectBtn,
        qqModal: !!qqModal,
        qqGroupBtn: !!qqGroupBtn,
        qqJoinBtn: !!qqJoinBtn,
        qqCloseBtn: !!qqCloseBtn,
        qqGroupInfo: !!qqGroupInfo,
        rankingModal: !!rankingModal,
        rankingBtn: !!rankingBtn,
        rankingCloseBtn: !!rankingCloseBtn,
        rankingRefreshBtn: !!rankingRefreshBtn,
        rankingContent: !!rankingContent
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
    window.open('https://qm.qq.com/q/OCroL7bkqI', '_blank');
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

// 实时获取并解析QQ群信息
function fetchQQGroupInfo() {
    console.log('实时获取QQ群信息');
    const proxyUrl = 'https://api.codetabs.com/v1/proxy/?quest=https://qm.qq.com/q/OCroL7bkqI';
    
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
            
            // 提取script标签中的JSON数据
            const scriptMatch = html.match(/<script type="application\/json"[^>]*id="__NUXT_DATA__">([\s\S]*?)<\/script>/);
            
            if (scriptMatch) {
                console.log('找到__NUXT_DATA__脚本标签');
                
                try {
                    const jsonData = JSON.parse(scriptMatch[1]);
                    console.log('解析__NUXT_DATA__成功:', jsonData);
                    
                    // 实时解析群信息
                    let groupInfoData = null;
                    
                    // 遍历数组查找包含groupinfo的元素
                    for (let i = 0; i < jsonData.length; i++) {
                        const item = jsonData[i];
                        
                        if (typeof item === 'string') {
                            // 尝试解析字符串
                            try {
                                const parsedItem = JSON.parse(item);
                                if (parsedItem.groupinfo) {
                                    groupInfoData = parsedItem;
                                    console.log('从字符串中找到groupinfo');
                                    break;
                                }
                            } catch (e) {
                                console.log('当前字符串不是有效的JSON:', item.substring(0, 100) + '...');
                            }
                        } else if (typeof item === 'object' && item !== null) {
                            if (item.groupinfo) {
                                groupInfoData = item;
                                console.log('直接找到groupinfo对象');
                                break;
                            }
                        }
                    }
                    
                    if (groupInfoData && groupInfoData.groupinfo) {
                        console.log('找到groupinfo数据:', groupInfoData.groupinfo);
                        
                        // 提取群信息
                        const groupinfo = groupInfoData.groupinfo;
                        const groupcode = groupinfo.groupcode || groupinfo.code || '949639146';
                        
                        // 构建正确的群头像URL
                        const avatarUrl = `http://qh.qlogo.cn/gh/${groupcode}/${groupcode}/`;
                        
                        // 处理成员头像
                        const memberAvatars = groupinfo.memberAvatars || [];
                        const processedMemberAvatars = memberAvatars.map(avatar => {
                            // 提取ek参数
                            const ekMatch = avatar.match(/ek=([^&]+)/);
                            if (ekMatch) {
                                return `http://qh.qlogo.cn?ek=${ekMatch[1]}`;
                            }
                            return avatar;
                        });
                        
                        qqGroupData = {
                            avatar: avatarUrl,
                            name: groupinfo.name || '服务器交流群',
                            code: groupcode,
                            memberCount: groupinfo.memberCnt || '未知',
                            desc: groupinfo.description || '暂无简介', // 群简介
                            tags: groupinfo.tags || [], // 群标签
                            createtime: groupinfo.createtime || null, // UTC建群时间戳
                            memberAvatars: processedMemberAvatars // 处理后的成员头像
                        };
                        
                        console.log('解析后的群信息:', qqGroupData);
                        // 实时显示群信息
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
                // 延迟显示默认信息
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

// 打开榜单模态框
function openRankingModal() {
    console.log('打开榜单模态框');
    if (rankingModal) {
        rankingModal.style.display = 'flex';
        // 加载榜单内容
        loadRankingContent();
    }
}

// 关闭榜单模态框
function closeRankingModal() {
    console.log('关闭榜单模态框');
    if (rankingModal) {
        rankingModal.style.display = 'none';
    }
}

// 加载榜单内容
function loadRankingContent() {
    console.log('加载榜单内容');
    if (rankingContent) {
        // 显示加载状态
        rankingContent.innerHTML = '<div class="loading">正在加载榜单...</div>';
        
        // 从GitHub获取ranking.md文件，添加时间戳避免缓存
        const timestamp = new Date().getTime();
        const githubUrl = `https://raw.githubusercontent.com/508364/-/main/ranking.md?_=${timestamp}`;
        fetch(githubUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应失败: ' + response.status);
                }
                return response.text();
            })
            .then(markdown => {
                console.log('获取到最新的GitHub markdown数据，开始渲染');
                // 使用marked.js渲染markdown内容
                const html = marked.parse(markdown);
                rankingContent.innerHTML = html;
            })
            .catch(error => {
                console.error('加载榜单失败:', error);
                rankingContent.innerHTML = '<div class="error">加载榜单失败，请稍后再试</div>';
            });
    }
}

// 初始化榜单功能
function initRanking() {
    if (rankingBtn) {
        console.log('初始化榜单按钮事件');
        
        // 添加点击事件，打开模态框
        rankingBtn.addEventListener('click', function() {
            console.log('用户点击了榜单按钮');
            openRankingModal();
        });
        
        // 初始化模态框关闭按钮事件
        if (rankingCloseBtn) {
            rankingCloseBtn.addEventListener('click', closeRankingModal);
        }
        
        // 初始化刷新按钮事件
        if (rankingRefreshBtn) {
            rankingRefreshBtn.addEventListener('click', function() {
                console.log('用户点击了刷新按钮');
                loadRankingContent();
            });
        }
        
        // 点击模态框外部关闭
        if (rankingModal) {
            rankingModal.addEventListener('click', function(event) {
                if (event.target === rankingModal) {
                    closeRankingModal();
                }
            });
        }
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