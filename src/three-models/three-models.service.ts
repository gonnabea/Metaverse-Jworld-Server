import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniHompi } from 'src/mini-hompi/entities/miniHompi.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { GetThreeModelsInput, GetThreeModelsOutput } from './dtos/getThreeModels.dto';
import { SaveThreeModelInput, SaveThreeModelOutput } from './dtos/saveThreeModel.dto';
import { ThreeModel } from './entities/threeModel.entity';

@Injectable()
export class ThreeModelsService {

    constructor(
        @InjectRepository(ThreeModel) private readonly threeModelRepository: Repository<ThreeModel>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(MiniHompi) private readonly miniHompiRepository: Repository<MiniHompi>

    ) {}

    async save({models}:SaveThreeModelInput, owner):Promise<SaveThreeModelOutput> {

        try {

            const user = await this.userRepository.findOne({id: owner.userId})
            const miniHompi = await this.miniHompiRepository.findOne({id: user.miniHompiId});

            if(!user) {
                return {
                    ok: false,
                    status: 409,
                    error: "유저를 찾을 수 없습니다."
                }
            }

            if(!miniHompi) {
                return {
                    ok: false,
                    status: 409,
                    error: "유저의 미니홈피를 찾을 수 없습니다."
                }
            }

            console.log(user)
            console.log(miniHompi)

            const originalModels = await this.threeModelRepository.find({miniHompi});

            await this.threeModelRepository.remove(originalModels)



            const threeModels = models.map( async ({

                installed,
                scale,
                rotateY,
                position,
                name,
                price,
                videoUrl,
                imageUrl,
                textContents,
                index
            }) => {

                const model = this.threeModelRepository.create({
                    installed,
                    scale,
                    rotateY,
                    position,
                    name,
                    price,
                    owner: user,
                    miniHompi,
                    videoUrl,
                    imageUrl,
                    textContents,
                    index
                });

                await this.threeModelRepository.save(model);
            })

            
    
            if(threeModels) {
                return {
                    ok: true,
                    status: 200
                }
            }

            return {
                ok: false,
                status: 400,
                error: "모델 저장 실패."
            }

        }
        catch(error) {
            return {
                ok: false,
                status: 520,
                error
            }
        }
        
    }

    async getModels({ id }: GetThreeModelsInput): Promise<GetThreeModelsOutput> {
        try{

            const miniHompi = await this.miniHompiRepository.findOne({id});

            const models = await this.threeModelRepository.find({miniHompi: miniHompi});

            
            if(!models) {
                return {
                    ok: false,
                    error: "3d 모델 조회 실패",
                    status: 403
                }
            }

            // models.map( async model => {
            //     const owner = await this.userRepository.findOne({ id: model.owner.id })
                
            // })
            console.log(models)
            return {
                ok: true,
                status: 200,
                models
            }
        }
        catch(error) {
            return {
                ok: false,
                status: 520,
                error
            }
        }
    }

 }
