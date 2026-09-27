/* stunning.nfts — portfolio data (snapshot from OpenSea) */

const WALLETS = [
  {
    id: "w2",
    address: "0xd83ceeb78c3b94eda193a34c1298847afc5b89ba",
    short: "0xd83c…b89ba",
    username: null,
    label: "Main Vault",
    ens: null,
    tokens: [
      { symbol: "WETH", name: "Wrapped Ethereum", chain: "ethereum", qty: "4.8136", usd: 13075.71, icon: "https://raw2.seadn.io/currency_logos/WETH.svg", tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" },
      { symbol: "ETH", name: "Ethereum", chain: "ethereum", qty: "0.1994", usd: 541.42, icon: "https://raw2.seadn.io/currency_logos/ETH.svg", tokenAddress: "0x0000000000000000000000000000000000000000" },
      { symbol: "USDC", name: "USDC", chain: "base", qty: "117.70", usd: 117.69, icon: "https://raw2.seadn.io/currency_logos/USDC.svg", tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" },
      { symbol: "J3FF", name: "J3FF by Virtuals", chain: "base", qty: "65,632", usd: 4.1, icon: "https://i2c.seadn.io/base/677d8ffa3ac7fc2fcb7ebda1/4596d5297f2a6801252d21408f977f/cb4596d5297f2a6801252d21408f977f.png", tokenAddress: "0x7c3af051bfa356b8eaee35c273a21ad9223ee994" },
      { symbol: "HEX", name: "HEX", chain: "ethereum", qty: "1,895", usd: 2.16, icon: "https://i2c.seadn.io/ethereum/67463be1d2898b5cd98b0659/948d6567fbaac301da5837c4a638f4/97948d6567fbaac301da5837c4a638f4.png", tokenAddress: "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39" },
      { symbol: "ETH", name: "Ethereum", chain: "blast", qty: "0.00008", usd: 0.22, icon: "https://raw2.seadn.io/currency_logos/ETH.svg" },
      { symbol: "MON", name: "MON", chain: "monad", qty: "1", usd: 0.03, icon: "https://raw2.seadn.io/currency_logos/MON.svg" }
    ],
    collections: [
      { name: "p̸r̵o̶x̷i̴e̸s̵", slug: "proxies-538403205", category: "PFPS", count: 7, usd: 1939.53, chain: "ethereum", contract: "0xd2515ca3a8f0a70c11797948ac05d0c2eab570fa", image: "https://i2c.seadn.io/ethereum/0xd2515ca3a8f0a70c11797948ac05d0c2eab570fa/8a80fe5abeb4040c89fe883e4fe73f/748a80fe5abeb4040c89fe883e4fe73f.png" },
      { name: "Genesis by DCA", slug: "genesis-by-dca", category: "ART", count: 1, usd: 817.65, chain: "ethereum", contract: "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a", image: "https://i2c.seadn.io/ethereum/f693477ab62f3e67b3f8731f021cf63a/0de37fe8e23c30e08e91a99eef504c/db0de37fe8e23c30e08e91a99eef504c.png" },
      { name: "Less Than Three", slug: "lessthanthree", category: "PFPS", count: 7, usd: 502.0, chain: "ethereum", contract: "0x4ef6f6a7ee7d1cf7f1f7bfad2ba56baab868de48", image: "https://i2c.seadn.io/collection/less-than-three-238161982/image_type_logo/f84ef6974f6214709b994261b9fe85/c5f84ef6974f6214709b994261b9fe85.png" },
      { name: "DropDedGorgez", slug: "gorgez", category: "PFPS", count: 6, usd: 241.22, chain: "ethereum", contract: "0x9c51a3cb5094b26aa1dcb380f3dc7e1a7c681c2d", image: "https://i2c.seadn.io/ethereum/5a92a4e707964fd2bc769b78c5d2fea2/5ca3aea3328e0105bc6139e583d73e/565ca3aea3328e0105bc6139e583d73e.png" },
      { name: "death and taxes : evaders", slug: "evaders", category: "PFPS", count: 3, usd: 234.7, chain: "ethereum", contract: "0x075f90ff6b89a1c164fb352bebd0a16f55804ca2", image: "https://i2c.seadn.io/collection/evaders/image_type_logo/65b2e313905954e82ca6877213d166/1f65b2e313905954e82ca6877213d166.png" },
      { name: "Steady Teddys", slug: "steady-teddys-eth", category: "PFPS", count: 14, usd: 231.98, chain: "ethereum", contract: "0x10a7aca36d27ef3fb63b638b39ca0d87d15972a0", image: "https://i2c.seadn.io/collection/steady-teddys-eth/image_type_logo/4f5f3f107b70f8cc55974271f9539c/bc4f5f3f107b70f8cc55974271f9539c.jpeg" },
      { name: "Letters by Vinnie Hager", slug: "letters-by-vinnie-hager", category: "ART", count: 1, usd: 149.4, chain: "ethereum", contract: "0x62384acda098444ab9d4483cf9a39b57", image: "https://i2c.seadn.io/ethereum/62384acda098444ab9d4483cf9a39b57/6d6fd108a7682034661ac663f46a58/fe6d6fd108a7682034661ac663f46a58.png" },
      { name: "moemoe LLC", slug: "moemoe-llc", category: "PFPS", count: 12, usd: 123.87, chain: "ethereum", contract: "0x0a0eec6e5d5b4c5e0b4e3f1a", image: "https://i2c.seadn.io/collection/moemoe-llc/image_type_logo/c427a622208f8a85cf86d15e19ff7e/51c427a622208f8a85cf86d15e19ff7e.png" },
      { name: "The Beaks", slug: "the-beaks-art", category: "PFPS", count: 6, usd: 122.24, chain: "ethereum", contract: "0x51653160e0e0b8f0e3d3f0a", image: "https://i2c.seadn.io/collection/the-beaks-51653160/image_type_logo/6e5c81120a799baca48d41a3440251/3c6e5c81120a799baca48d41a3440251.jpeg" },
      { name: "Nippy: Magnet for Mischief", slug: "nippy-official", category: "PFPS", count: 4, usd: 97.79, chain: "ethereum", contract: "0xad2ec2003f3c4e8a85593aafa23e8a1d", image: "https://i2c.seadn.io/ethereum/ad2ec2003f3c4e8a85593aafa23e8a1d/c2dc73ad2b614c3dc86e2bc0e85b31/30c2dc73ad2b614c3dc86e2bc0e85b31.png" },
      { name: "Lazy Ape Official", slug: "official-lazyapes", category: "PFPS", count: 5, usd: 55.69, chain: "ethereum", contract: "0x5cbcbb8dbf9d4159b184b57d99512193", image: "https://i2c.seadn.io/ethereum/5cbcbb8dbf9d4159b184b57d99512193/0fafb2587d56da42fe62d770bd84e6/1e0fafb2587d56da42fe62d770bd84e6.jpeg" },
      { name: "the end of the world", slug: "theendoftheworldofficial", category: "PFPS", count: 6, usd: 52.16, chain: "ethereum", contract: "0x6789529733ed4487", image: "https://i2c.seadn.io/collection/the-end-of-the-world-678952973/image_type_logo/26723f6eec99206da2d6f6b9060234/3f26723f6eec99206da2d6f6b9060234.gif" },
      { name: "SIGHTSEERS BY NORMAN HARMAN", slug: "sightseers-by-norman-harman", category: "PFPS", count: 1, usd: 50.8, chain: "ethereum", contract: "0x3658e6ed3b964bc49eb490d0f6d29978", image: "https://i2c.seadn.io/ethereum/3658e6ed3b964bc49eb490d0f6d29978/3ed4487b79a20f5afc4c4bd4a88d85/d73ed4487b79a20f5afc4c4bd4a88d85.png" },
      { name: "Very Internet Person", slug: "veryinternetperson", category: "PFPS", count: 14, usd: 41.83, chain: "ethereum", contract: "0x9cfc224086f543f3be631ddf70622a38", image: "https://i2c.seadn.io/ethereum/9cfc224086f543f3be631ddf70622a38/f0ad9184e3294664eafd425b5a348f/fff0ad9184e3294664eafd425b5a348f.gif" },
      { name: "WAGMI Game Genesis", slug: "wagmi-genesis-collection", category: "GAMING", count: 1, usd: 41.02, chain: "ethereum", contract: "0xcdb8ada40f8746e7910432931619f33a", image: "https://i2c.seadn.io/ethereum/cdb8ada40f8746e7910432931619f33a/0e5f3678cb5654a5e56f416443bd99/ef0e5f3678cb5654a5e56f416443bd99.png" },
      { name: "CYPHERPUNK FILES", slug: "cypherpunk-files", category: "OTHER", count: 6, usd: 40.75, chain: "ethereum", contract: "0x8cee41aaa94301cd794e7a17776a6ba1", image: "https://i2c.seadn.io/collection/cypherpunk-files/image_type_logo/ee41aaa94301cd794e7a17776a6ba1/8cee41aaa94301cd794e7a17776a6ba1.png" },
      { name: "The Art Pass by Iconic Moments", slug: "iconic-moments-the-art-pass", category: "MEMBERSHIPS", count: 1, usd: 29.88, chain: "ethereum", contract: "0xd23059dcc0934571a657d78c9676f189", image: "https://i2c.seadn.io/ethereum/d23059dcc0934571a657d78c9676f189/75036eae94db14f3becc2c16a41046/6475036eae94db14f3becc2c16a41046.png" },
      { name: "Gemesis", slug: "gemesis", category: "MEMBERSHIPS", count: 1, usd: 29.34, chain: "ethereum", contract: "0x60b62b578677478b9e1e880dc0940a87", image: "https://i2c.seadn.io/ethereum/60b62b578677478b9e1e880dc0940a87/d181433ee09174f09a0e31b563d313/7ed181433ee09174f09a0e31b563d313.png" },
      { name: "GRILLZ GANG", slug: "grillzgang", category: "PFPS", count: 3, usd: 28.52, chain: "ethereum", contract: "0x58e578b32674423f893f5142eaa3b6ad", image: "https://i2c.seadn.io/ethereum/58e578b32674423f893f5142eaa3b6ad/21ea388185e30d0259282dec5c1965/3621ea388185e30d0259282dec5c1965.jpeg" },
      { name: "Doge Pound Puppies", slug: "doge-pound-puppies-real", category: "PFPS", count: 5, usd: 20.37, chain: "ethereum", contract: "0xf8f544d126834e7c9e7203624adb0556", image: "https://i2c.seadn.io/ethereum/f8f544d126834e7c9e7203624adb0556/50205793edda4d6aecd2e387558a91/4750205793edda4d6aecd2e387558a91.gif" }
    ]
  },
  {
    id: "w1",
    address: "0x6d172b55c95393285a1750da13b9c4bf968e4ea2",
    short: "0x6d17…4ea2",
    username: "0x6D172B55",
    label: "Robinhood Chain",
    ens: null,
    tokens: [
      { symbol: "WETH", name: "Wrapped Ethereum", chain: "robinhood", qty: "0.0230", usd: 62.56, icon: "https://raw2.seadn.io/currency_logos/WETH.svg" },
      { symbol: "ETH", name: "Ethereum", chain: "robinhood", qty: "0.0087", usd: 23.51, icon: "https://raw2.seadn.io/currency_logos/ETH.svg" },
      { symbol: "WETH", name: "Wrapped Ethereum", chain: "base", qty: "0.0029", usd: 7.88, icon: "https://raw2.seadn.io/currency_logos/WETH.svg", tokenAddress: "0x4200000000000000000000000000000000000006" },
      { symbol: "USDG", name: "Global Dollar", chain: "robinhood", qty: "3.28", usd: 3.28, icon: "https://raw2.seadn.io/currency_logos/USDG.svg" },
      { symbol: "ETH", name: "Ethereum", chain: "base", qty: "0.0008", usd: 2.1, icon: "https://raw2.seadn.io/currency_logos/ETH.svg", tokenAddress: "0x0000000000000000000000000000000000000000" }
    ],
    collections: [
      { name: "Clickihood", slug: "clickihood", category: "GAMING", count: 4, usd: 44.54, chain: "robinhood", contract: "0x985607672ffee71316d3ebf2c71c8381435f156e", image: "https://i2c.seadn.io/collection/clickihood-workers/image_type_logo/345a16a098810af1cf00f4cc6f1e90/69345a16a098810af1cf00f4cc6f1e90.png" },
      { name: "Portable Slop Drive", slug: "portable-slop-drive", category: "OTHER", count: 1, usd: 0.62, chain: "robinhood", contract: "0xc7b9d04d754f9f29b2ff363b3c0542675e5026e5", image: "https://i2c.seadn.io/collection/portable-slop-drive/image_type_logo/a3179512eb287762c6add200f140d6/eea3179512eb287762c6add200f140d6.gif" }
    ]
  }
];
