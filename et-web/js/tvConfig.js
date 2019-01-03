export default {
    debug: true, // uncomment this line to see Library errors and warnings in the console
    fullscreen: false,
    autosize: true,
    // wdith: '100vw',
    // height: 800,
    interval: "1d",
    exchanges: [{
        value: "Exchain",
        name: "All Exchanges",
        desc: ""
    }, ],
    supports_search: true,
    supports_group_request: true,
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    supports_marks: true,
    supports_timescale_marks: true,
    supports_time: true,
    library_path: "charting_library/",
    timezone: "America/New_York",
    disabled_features: ["use_localstorage_for_settings"],
    enabled_features: ["study_templates"],
    charts_storage_url: "http://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    time_frames: [{
            resolution: "30",
            text: "1m"
        },
        {
            resolution: "5",
            text: "5d"
        },
        {
            resolution: "1",
            text: "1d"
        }
    ],
    // widgetbar: {
    //     details: true,
    //     watchlist: true,
    //     watchlist_settings: {
    //         default_symbols: ["NYSE:AA", "NYSE:AAL", "NASDAQ:AAPL"],
    //         readonly: false
    //     }
    // },
    hide_side_toolbar: true

}