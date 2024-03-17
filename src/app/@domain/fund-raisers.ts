export interface FundRaisers {
    id: string
    title: string
    description: string
    title_of_the_music: string
    image: string
    nft_image: string
    start_date: string
    end_date: string
    target_amount: number
    distribution: number
    current_amount: number
    created_by: string
    created_at: string
    creater_name: string
    geners: string
    is_active: string
    is_completed: string
    status: string
    investers: Invester[]
  }

  export interface Invester {
    invester_id: string
    investment_amount: number
    invested_date: string
    own_percentage: number
  }


